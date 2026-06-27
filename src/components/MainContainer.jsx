import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"
const MainContainer = () => {
    const nowPlayingMovies = useSelector((store) => store.movies?.nowPlayingMovies)

    // Guard clause: prevent accessing properties if movies is null or empty
    if (!nowPlayingMovies || nowPlayingMovies.length === 0) return null;

    // Find the first English movie (highly likely to have trailers), or fallback to the first movie in the list
    const mainMovie = nowPlayingMovies.find(movie => movie.original_language === "en") || nowPlayingMovies[0];
  
    console.log("MainContainer: mainMovie", mainMovie)

    const { original_title, overview, id, backdrop_path } = mainMovie;

  return (
    <div className="relative">
      <VideoBackground movieId={id} backdropPath={backdrop_path} />
      <div className="absolute top-0 left-0 w-full z-40">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </div>
  )
}
export default MainContainer