import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActionMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useActionMovies = () => {
  const dispatch = useDispatch();
  const actionMovies = useSelector((store) => store.movies.actionMovies);

  useEffect(() => {
    if (!actionMovies) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=popularity.desc&page=1",
            API_OPTIONS
          );
          const data = await response.json();
          dispatch(addActionMovies(data.results));
        } catch (err) {
          console.error(err);
        }
      };
      fetchMovies();
    }
  }, []);
};

export default useActionMovies;
