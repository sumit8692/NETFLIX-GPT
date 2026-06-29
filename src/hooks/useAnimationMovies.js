import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnimationMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useAnimationMovies = () => {
  const dispatch = useDispatch();
  const animationMovies = useSelector((store) => store.movies.animationMovies);

  useEffect(() => {
    if (!animationMovies) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=popularity.desc&page=1",
            API_OPTIONS
          );
          const data = await response.json();
          dispatch(addAnimationMovies(data.results));
        } catch (err) {
          console.error(err);
        }
      };
      fetchMovies();
    }
  }, []);
};

export default useAnimationMovies;
