import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
 
export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser())
      navigate("/")
    }).catch((error) => {
      console.log(error)
    });
  }
  return (<div>
    <div
      className="absolute bs-gradient-to-b from-black top-0 left-0 px-4 py-3 z-50"
      style={{ position: 'fixed', top: 0, left: 0, padding: '0.75rem 1rem', zIndex: 50 }}
    >
      <img
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-05-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
        className="w-32 h-auto"
        style={{ width: '8rem', height: 'auto' }}
      />
    </div>
    {user && (
      <div className='absolute top-3 right-10 z-50'>
        <div className='relative group flex items-center gap-2 cursor-pointer pb-3'>
          <img
            src={user.photoURL}
            alt="profile icon"
            className='w-10 h-10 rounded-full border-2 border-transparent group-hover:border-white transition-all'
          />
          {/* Dropdown — hidden by default, shown on hover */}
          <div className='absolute right-0 top-9 pt-3 hidden group-hover:block'>
            <div className='bg-black/90 backdrop-blur-sm rounded-md shadow-xl py-1 min-w-[130px] border border-white/10'>
              <button
                className='bg-red-500 w-full text-left px-4 py-2 text-white text-sm hover:bg-red-600 transition-colors cursor-pointer'
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