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

const Browse = () => {
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
    </div>
  )
}

export default Browse