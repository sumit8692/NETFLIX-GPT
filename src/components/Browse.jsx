import { useSelector, useDispatch } from "react-redux"
import { Header } from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import useTopRatedMovies from "../hooks/useTopRatedMovies"
import useHorrorMovies from "../hooks/useHorrorMovies"
import useComedyMovies from "../hooks/useComedyMovies"
import useActionMovies from "../hooks/useActionMovies"
import useThrillerMovies from "../hooks/useThrillerMovies"
import useAnimationMovies from "../hooks/useAnimationMovies"
import useSciFiMovies from "../hooks/useSciFiMovies"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import GptSearch from "./GptSearch"
import { toggleGptSearch } from "../utils/gptSlice"

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  const dispatch = useDispatch()

  useNowPlayingMovies();
  useTopRatedMovies();
  useHorrorMovies();
  useComedyMovies();
  useActionMovies();
  useThrillerMovies();
  useAnimationMovies();
  useSciFiMovies();

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {showGptSearch && <GptSearch onClose={() => dispatch(toggleGptSearch())} />}
    </div>
  )
}

export default Browse