import { useEffect } from 'react'
import Browse from './Browse'
import Login from './Login'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const AuthListener = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user
        dispatch(addUser({ uid, email, displayName, photoURL }))
        navigate("/browse")
      } else {
        dispatch(removeUser())
        // Only redirect if on a protected route — don't change URL on /
        if (location.pathname === "/browse") {
          navigate("/login")
        }
      }
    })
    return () => unsubscribe()
  }, [])

  return null
}

const Body = () => {
  return (
    <BrowserRouter>
      <AuthListener />
      <Routes>
        <Route path="/"       element={<Login />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Body
