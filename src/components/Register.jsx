import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { Alert } from "./Alert"


export function Register() {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')


  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(user.email, user.password)
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Invalid Email')
      }
      else if (error.code === 'auth/email-already-in-use') {
        setError('Email already taken')
      }
      else if (error.code === 'auth/weak-password') {
        setError('Weak Password')
      }
      else if (error.code === 'auth/missing-email'){
        setError('Write an email')
      }
    }
  }

  return (
    <div className="w-full max-w-xs m-auto  mt-36 mb-52">

      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="bg-neutral-900 shadow-md rounded px-8 pt-6
      pb-8 mb-4">

        <label htmlFor="email" className="block text-white 
        text-sm font-bold mb-2">Email</label>
        <input type="email" name="email" id="email"
          placeholder="exampleEmail@gmail.com"
          onChange={handleChange} className="shadow appearance-none
          border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="password" className="block text-white 
        text-sm font-bold mb-2">Password</label>
        <input type="password" name="password" id="password"
          onChange={handleChange} className="shadow appearance-none
          border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline"
        />

        <button type="submit" className="bg-blue-500
         hover:bg-blue-700 text-white font-bold
         py-2 px-4 rounded focus:outline-none
          focus:shadow-outline mt-4">Register</button>
      </form>

      <p className="my-4 text-sm flex justify-between px-10">Alredy have an Account? 
      <Link to={'/login'}>Login</Link></p>
    </div>
  )
}
