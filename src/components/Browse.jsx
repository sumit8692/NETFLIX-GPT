import { Header } from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      {/* Main content of the Browse page goes here. You can add components to display the now playing movies or any other content you want to show on this page. 

        //Main container
          -VideoBackground
          -Title
        //secondary container
          -NowPlayingMoviesList
          -OtherContent
        
      */}
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse