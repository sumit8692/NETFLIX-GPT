import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addThrillerMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useThrillerMovies = () => {
  const dispatch = useDispatch();
  const thrillerMovies = useSelector((store) => store.movies.thrillerMovies);

  useEffect(() => {
    if (!thrillerMovies) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?with_genres=53&sort_by=popularity.desc&page=1",
            API_OPTIONS
          );
          const data = await response.json();
          dispatch(addThrillerMovies(data.results));
        } catch (err) {
          console.error(err);
        }
      };
      fetchMovies();
    }
  }, []);
};

export default useThrillerMovies;
