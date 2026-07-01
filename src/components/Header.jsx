import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { logo } from "../utils/constants";
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
    <div className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
      {/* Netflix Logo */}
      <img src={logo} alt="Netflix Logo" className="w-32 h-auto" />

      {/* Right side — only shown when logged in */}
      {user && (
        <div className="flex items-center gap-4">
          {/* GPT Search Button — hidden while overlay is open */}
          {!showGptSearch && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer"
              onClick={handleGptSearchClick}
            >
              GPT Search
            </button>
          )}

          {/* Avatar + dropdown */}
          <div className="relative group flex items-center gap-2 cursor-pointer pb-1">
            <img
              src={user.photoURL}
              alt="profile icon"
              className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-white transition-all"
            />
            {/* Dropdown — hidden by default, shown on hover */}
            <div className="absolute right-0 top-11 pt-1 hidden group-hover:block">
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
        </div>
      )}
    </div>
  );
};