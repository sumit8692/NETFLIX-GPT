import { useState } from 'react'
import { useRef } from 'react'
import { Header } from "./Header"
import checkValidateData from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleButtonClick = (e) => {
    e.preventDefault()
    const emailValue = email.current?.value
    const passwordValue = password.current?.value
    const nameValue = name.current?.value
    const { isValid, message } = checkValidateData(emailValue, passwordValue)
    if (!isValid) {
      setErrorMsg(message)
      return
    }
    setErrorMsg('')
    // TODO: sign in / sign up logic here
    if(message === "Validation successful.") {
      console.log("Form is valid. Proceed with sign in or sign up logic.")
    }
    if(!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: nameValue,
          photoURL: "https://i.pinimg.com/736x/92/b4/e7/92b4e7c57de1b5e1e8c5e883fd915450.jpg"
        }).then(() => {
          // Use nameValue directly — user.displayName is stale (null) right after updateProfile
          dispatch(addUser({ uid: user.uid, email: user.email, displayName: nameValue, photoURL: user.photoURL }))
          navigate("/browse")
        }).catch((error) => {
          console.log(error)
        });
      })
      .catch((error) => {
        setErrorMsg(error.message)
        // ..
      });
      
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User signed in successfully:", user)
        navigate("/browse")
      })
      .catch((error) => {
        setErrorMsg(error.message)
      });
    }
  }
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  return (
    <div>
      <Header />
      <div className="relative">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a565a928-abda-47bd-860a-55be00b7fefc/web/US-en-20260615-TRIFECTA-perspective_22f98b6d-12c0-4b1d-b261-54883e4c4b11_large.jpg"
          alt="Browse Image"
          className="w-full h-auto opacity-40"
        />
        <form onSubmit={handleButtonClick} className="absolute opacity-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm p-6 sm:p-10 w-11/12 max-w-md rounded-xl shadow-xl text-white">

          {/* Header text */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">
              {isSignInForm ? 'Welcome back' : 'Create Account'}
            </h1>
            <p className="text-sm text-gray-300">
              {isSignInForm
                ? 'Sign in to continue to Netflix-GPT'
                : 'Sign up to continue to Netflix-GPT'}
            </p>
          </div>

          <div className="mt-6 space-y-4">

            {/* Name field — only shown in Sign Up mode */}
            {!isSignInForm && (
              <>
                <label className="sr-only" htmlFor="name">Full Name</label>
                <input
                  ref={name}
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-md bg-white/5 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </>
            )}

            {/* Email */}
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              ref={email}
              id="email"
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-md bg-white/5 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            {/* Password with eye toggle */}
            <label className="sr-only" htmlFor="password">Password</label>
            <div className="relative">
              <input
                ref={password}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-3 rounded-md bg-white/5 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Remember me + Forgot password — only in Sign In mode */}
            {isSignInForm && (
              <div className="flex items-center justify-between text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Remember me</span>
                </label>
                <a className="text-red-500 hover:underline" href="#">Forgot password?</a>
              </div>
            )}

            {/* Validation error message */}
            {errorMsg && (
              <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md shadow transition-colors"
            >
              {isSignInForm ? 'Sign In' : 'Sign Up'}
            </button>

          </div>

          {/* Toggle between Sign In / Sign Up */}
          <p className="text-center mt-6 text-gray-300 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? <>Are you new to Netflix? <span className="text-red-500 hover:underline">Sign up now.</span></>
              : <>Already have an account? <span className="text-red-500 hover:underline">Sign in.</span></>
            }
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login