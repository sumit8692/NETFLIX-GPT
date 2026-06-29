import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHorrorMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useHorrorMovies = () => {
  const dispatch = useDispatch();
  const horrorMovies = useSelector((store) => store.movies.horrorMovies);

  useEffect(() => {
    if (!horrorMovies) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?with_genres=27&sort_by=popularity.desc&page=1",
            API_OPTIONS
          );
          const data = await response.json();
          dispatch(addHorrorMovies(data.results));
        } catch (err) {
          console.error(err);
        }
      };
      fetchMovies();
    }
  }, []);
};

export default useHorrorMovies;
