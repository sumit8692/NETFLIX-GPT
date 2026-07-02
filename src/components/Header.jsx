import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { toggleGptSearch } from "../utils/gptSlice";

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch())
  }
  
  return (
    <div className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-3 py-2 md:px-4 md:py-3 bg-gradient-to-b from-black/80 to-transparent">
      {/* WebFlix curved neon logo — sized down to fit narrow mobile displays */}
      <svg className="w-32 h-12 md:w-44 md:h-16 overflow-visible select-none neon-webflix" viewBox="0 0 200 60">
        <defs>
          {/* Gentle curved path from left to right */}
          <path id="curve" d="M 10 42 Q 100 24 190 42" fill="transparent" />
          
          {/* Native SVG neon glow filter (100% cross-device compatible) */}
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <text className="font-['Anton'] text-[2.1rem] tracking-[0.06em]">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            <tspan className="web" filter="url(#neon-glow)">Web</tspan>
            <tspan className="flix" filter="url(#neon-glow)">Flix</tspan>
          </textPath>
        </text>
      </svg>

      {/* Right side — only shown when logged in */}
      {user && (
        <div className="flex items-center gap-2 md:gap-4">
          {/* GPT Search Button — hidden while overlay is open, optimized for narrow screens */}
          {!showGptSearch && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-semibold px-2.5 py-1.5 md:px-4 md:py-2 rounded-md transition-all active:scale-95 cursor-pointer flex-shrink-0"
              onClick={handleGptSearchClick}
            >
              GPT Search
            </button>
          )}

          {/* Avatar + dropdown */}
          <div className="relative group flex items-center gap-1.5 md:gap-2 cursor-pointer pb-1">
            <img
              src={user.photoURL}
              alt="profile icon"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-transparent group-hover:border-white transition-all flex-shrink-0"
            />
            {/* Dropdown — hidden by default, shown on hover */}
            <div className="absolute right-0 top-9 md:top-11 pt-1 hidden group-hover:block">
              <div className="bg-black/90 backdrop-blur-sm rounded-md shadow-xl py-1 min-w-[130px] border border-white/10">
                <button
                  className="w-full text-left px-4 py-2 text-white text-sm hover:bg-red-600 transition-colors cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      )}
    </div>
  );
};