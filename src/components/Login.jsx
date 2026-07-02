import { useState, useRef } from 'react';
import { Header } from "./Header";
import checkValidateData from '../utils/validate';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState("signin"); // "signin" | "signup" | "forgotpassword"
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = (e) => {
    e.preventDefault();
    const emailValue = email.current?.value?.trim();
    const passwordValue = password.current?.value;
    const nameValue = name.current?.value?.trim();

    // ── Forgot Password Logic ──────────────────────────────────────────
    if (formType === "forgotpassword") {
      if (!emailValue) {
        setErrorMsg("Please enter your email address.");
        setSuccessMsg(null);
        return;
      }
      setIsSubmitting(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      sendPasswordResetEmail(auth, emailValue)
        .then(() => {
          setSuccessMsg("Reset link sent! Check your email inbox.");
          if (email.current) email.current.value = "";
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            setErrorMsg("No account found with this email.");
          } else if (error.code === "auth/invalid-email") {
            setErrorMsg("Please enter a valid email address.");
          } else {
            setErrorMsg("Failed to send reset email. Try again later.");
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
      return;
    }

    // ── Sign In / Sign Up Validation ───────────────────────────────────
    const { isValid, message } = checkValidateData(emailValue, passwordValue);
    if (!isValid) {
      setErrorMsg(message);
      return;
    }
    setErrorMsg('');

    if (formType === "signup") {
      // Sign Up logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL: "https://i.pinimg.com/736x/92/b4/e7/92b4e7c57de1b5e1e8c5e883fd915450.jpg"
          }).then(() => {
            dispatch(addUser({ uid: user.uid, email: user.email, displayName: nameValue, photoURL: user.photoURL }));
            navigate("/browse");
          }).catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in successfully:", user);
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    }
  };

  const resetFormState = (type) => {
    setFormType(type);
    setErrorMsg(null);
    setSuccessMsg(null);
    if (email.current) email.current.value = "";
    if (password.current) password.current.value = "";
    if (name.current) name.current.value = "";
  };

  return (
    <div>
      <Header />
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image overlay */}
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a565a928-abda-47bd-860a-55be00b7fefc/web/US-en-20260615-TRIFECTA-perspective_22f98b6d-12c0-4b1d-b261-54883e4c4b11_large.jpg"
          alt="Browse Image"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        <form 
          onSubmit={handleButtonClick} 
          className="relative z-10 bg-black/70 backdrop-blur-sm p-6 sm:p-10 w-11/12 max-w-md rounded-xl shadow-xl text-white"
        >
          {/* Header text */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">
              {formType === "signin" && 'Welcome back'}
              {formType === "signup" && 'Create Account'}
              {formType === "forgotpassword" && 'Reset Password'}
            </h1>
            <p className="text-sm text-gray-300">
              {formType === "signin" && 'Sign in to continue to WebFlix'}
              {formType === "signup" && 'Sign up to continue to WebFlix'}
              {formType === "forgotpassword" && 'Enter your email to receive a password reset link.'}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {/* Name field — only shown in Sign Up mode */}
            {formType === "signup" && (
              <div>
                <label className="sr-only" htmlFor="name">Full Name</label>
                <input
                  ref={name}
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-md bg-white/5 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                ref={email}
                id="email"
                type="email"
                placeholder="Email address"
                disabled={isSubmitting}
                className="w-full p-3 rounded-md bg-white/5 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
              />
            </div>

            {/* Password field with eye toggle — hidden during Forgot Password */}
            {formType !== "forgotpassword" && (
              <div>
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
              </div>
            )}

            {/* Remember me + Forgot password — only in Sign In mode */}
            {formType === "signin" && (
              <div className="flex items-center justify-between text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Remember me</span>
                </label>
                <button 
                  type="button"
                  onClick={() => resetFormState("forgotpassword")}
                  className="text-red-500 hover:underline cursor-pointer bg-transparent border-none text-sm"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Success message */}
            {successMsg && (
              <p className="text-emerald-400 text-sm font-medium">{successMsg}</p>
            )}

            {/* Validation/API error message */}
            {errorMsg && (
              <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md shadow transition-colors font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {formType === "signin" && 'Sign In'}
              {formType === "signup" && 'Sign Up'}
              {formType === "forgotpassword" && (isSubmitting ? 'Sending...' : 'Send Reset Email')}
            </button>
          </div>

          {/* Form toggles */}
          <div className="text-center mt-6 text-sm text-gray-300">
            {formType === "forgotpassword" ? (
              <button 
                type="button"
                onClick={() => resetFormState("signin")}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Back to Sign In
              </button>
            ) : (
              <p 
                className="cursor-pointer" 
                onClick={() => resetFormState(formType === "signin" ? "signup" : "signin")}
              >
                {formType === "signin" ? (
                  <>Are you new to WebFlix? <span className="text-red-500 hover:underline">Sign up now.</span></>
                ) : (
                  <>Already have an account? <span className="text-red-500 hover:underline">Sign in.</span></>
                )}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;