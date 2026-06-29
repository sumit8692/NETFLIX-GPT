import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComedyMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useComedyMovies = () => {
  const dispatch = useDispatch();
  const comedyMovies = useSelector((store) => store.movies.comedyMovies);

  useEffect(() => {
    if (!comedyMovies) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?with_genres=35&sort_by=popularity.desc&page=1",
            API_OPTIONS
          );
          const data = await response.json();
          dispatch(addComedyMovies(data.results));
        } catch (err) {
          console.error(err);
        }
      };
      fetchMovies();
    }
  }, []);
};

export default useComedyMovies;
