import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { Alert } from "./Alert"


export function Login() {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')


  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password);
      navigate('/');
    } catch (error) {
      if(error.code === 'auth/user-not-found'){
        setError('Invalid User')
      }
      else if(error.code === 'auth/invalid-email'){
        setError('Invalid email')
      }
      else if(error.code === 'auth/wrong-password'){
        setError('Wrong Password')
      }
      else if (error.code === 'auth/missing-email'){
        setError('Write an email')
      }
    }
  }

  return (
    <div className="w-full max-w-xs m-auto mt-36 mb-52">

      {error && <Alert message={error}/>}
      
      <form onSubmit={handleSubmit} className="bg-neutral-900 shadow-md rounded px-8 pt-6
      pb-8 mb-4">

        <div className="mb-4">
        <label htmlFor="email" className="block text-white  
        text-sm font-bold mb-2">Email</label>
        <input type="email" name="email" id="email"
          placeholder="exampleEmail@gmail.com" className="shadow appearance-none
          border rounded w-full py-2 px-3 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
        </div>

        <div className="mb-4">
        <label htmlFor="password" className="block text-white  
        text-sm font-bold mb-2">Password</label>
        <input type="password" name="password" id="password" className="shadow appearance-none
          border rounded w-full py-2 px-3 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline"
          onChange={handleChange}
        />
        </div>
        
        <button type="submit" className="bg-blue-500
         hover:bg-blue-700 text-white font-bold
         py-2 px-4 focus:outline-none
          focus:shadow-outline">Login</button>
      </form>
    
    </div>
  )
}
