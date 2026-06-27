import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId, backdropPath) => {
  const dispatch = useDispatch();
  const [hideOverlay, setHideOverlay] = useState(false);

  // Read trailer from Redux store to avoid re-fetching if already cached
  const trailerVideo = useSelector((state) => {
    const movie = state.movies.nowPlayingMovies?.find((m) => m.id === movieId);
    return movie?.trailerVideo;
  });

  const trailerKey = trailerVideo?.key;

  // Fetch trailer from TMDB and store in Redux
  useEffect(() => {
    // Skip fetching if trailer is already cached in the Redux store
    if (trailerVideo) return;

    const getMoviesVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );
        const json = await response.json();
        const filterData = json.results?.filter((video) => video.type === "Trailer");
        const trailer = filterData?.length ? filterData[0] : json.results?.[0];
        dispatch(addTrailerVideo({ movieId, trailerVideo: trailer }));
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    if (movieId) {
      getMoviesVideos();
    }
  }, [movieId]);

  // Wait 6 seconds for YouTube controls to disappear, then reveal the video
  useEffect(() => {
    if (!trailerKey) return;
    setHideOverlay(false);
    const timer = setTimeout(() => {
      setHideOverlay(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [trailerKey]);

  // TMDB full-resolution backdrop URL
  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : null;

  return { trailerKey, backdropUrl, hideOverlay };
};

export default useMovieTrailer;
