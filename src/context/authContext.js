import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase.config'

export const authContext = createContext()
export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        throw new Error('There is no auth provider')
    }
    return context
}


export function AuthProvider({children}) {

    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth)

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
    }, [])


    return(
        <authContext.Provider value={{signup, login, logout, loading, user }}>
            {children}
        </authContext.Provider>
    )
}