import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies)

  return (
    <div className="relative z-50">
      {/* First list overlaps the bottom of the hero gradient */}
      <div className="-mt-36 bg-transparent">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/> 
      </div>

      {/* Remaining lists on solid black */}
      <div className="bg-black">
        <MovieList title={"Top Rated"} movies={movies?.topRatedMovies}/>
        <MovieList title={"Action"} movies={movies?.actionMovies}/>
        <MovieList title={"Horror"} movies={movies?.horrorMovies}/> 
        <MovieList title={"Comedy"} movies={movies?.comedyMovies}/>
        <MovieList title={"Thriller"} movies={movies?.thrillerMovies}/>
        <MovieList title={"Animation"} movies={movies?.animationMovies}/>
        <MovieList title={"Sci-Fi"} movies={movies?.sciFiMovies}/>
      </div>
    </div>
  )
}

export default SecondaryContainer