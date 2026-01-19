import { useState } from "react";
import Header from "./Header";
import checkValidData from "../utils/validate";
import { useRef } from "react"; 
const Login = () => {

    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null)
    const password = useRef(null);
    const name = useRef(null);
    
    const handleSignIn = () => {
        setIsSignIn(!isSignIn);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = checkValidData(
            email.current.value,
            password.current.value,
            isSignIn ? null : name.current?.value
        );
        setErrorMessage(validationError);
        if (validationError) return;
       
    };
    return (

    <div className="relative min-h-screen">
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/797df41b-1129-4496-beb3-6fc2f29c59d3/web/US-en-20260112-TRIFECTA-perspective_7180643a-1c81-4b81-8b35-82a9e6ba091e_large.jpg"
        alt="Login-Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <form onSubmit={handleSubmit} className="w-3/12 h-1/2 border border-white/10 rounded-lg p-10 bg-black/60 text-white">
          <h1 className="text-4xl font-bold pb-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          <div className={isSignIn ? "invisible" : ""} aria-hidden={isSignIn}>
            <input
              ref={name}
              type="name"
              placeholder="Name"
              className="my-4 w-full p-2 rounded-lg bg-opacity-10 text-black bg-gray-700/100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <input
            ref={email}
            type="email"
            placeholder="Email address"
            className="my-4 w-full p-2 rounded-lg bg-opacity-10 text-black bg-gray-700/100 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="my-4 w-full p-2 rounded-lg text-black bg-opacity-10 bg-gray-700/100 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button type="submit" className="bg-red-600 text-white p-2 rounded-md w-full">
             {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          {errorMessage && (
            <p className="mt-4 text-sm text-red-400 text-center">{errorMessage}</p>
          )}
          <div className="relative min-h-[96px]">
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center space-y-4 ${
                isSignIn ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              aria-hidden={isSignIn}
            >
              <p className="text-sm text-gray-400 text-center">
                <span className="text-white">Already have an account?</span>
              </p>
              <p className="text-sm text-white text-center" onClick={handleSignIn}>
                <span className="cursor-pointer font-bold text-lg text-white hover:underline">Sign in</span>
              </p>
            </div>
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center space-y-4 ${
                !isSignIn ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              aria-hidden={!isSignIn}
            >
              <p className="text-sm text-gray-400 text-center">
                <span className="text-white">Are you new here?</span>
              </p>
              <p className="text-s text-white text-center" onClick={handleSignIn}>
                <span className="cursor-pointer font-bold text-lg text-white hover:underline">Sign up now.</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;