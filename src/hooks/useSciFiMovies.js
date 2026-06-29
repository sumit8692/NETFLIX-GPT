import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSciFiMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useSciFiMovies = () => {
  const dispatch = useDispatch();
  const sciFiMovies = useSelector((store) => store.movies.sciFiMovies);

  useEffect(() => {
    if (!sciFiMovies) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?with_genres=878&sort_by=popularity.desc&page=1",
            API_OPTIONS
          );
          const data = await response.json();
          dispatch(addSciFiMovies(data.results));
        } catch (err) {
          console.error(err);
        }
      };
      fetchMovies();
    }
  }, []);
};

export default useSciFiMovies;
