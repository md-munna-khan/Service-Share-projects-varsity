



/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'

// import axios from 'axios'
import { app } from '../firebse/fireabse.init'
import axios from 'axios'


export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDark,setIsDark]=useState(false)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

    
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,async currentUser => {
      
      console.log('CurrentUser-->', currentUser)
if(currentUser?.email){
  setUser(currentUser)
  const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
    email:currentUser?.email
  },{withCredentials:true}
)
  console.log(data)
}else{
  setUser(currentUser)

   await axios.post(`${import.meta.env.VITE_API_URL}/clear-cookie`,{},{withCredentials:true}
   
   
)

}  setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  isDark,
  setIsDark
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
