import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const VideoBackground = ({ movieId, backdropPath }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [hideOverlay, setHideOverlay] = useState(false);

  // Fetch the trailer key from TMDB
  useEffect(() => {
    const getMoviesVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );
        const json = await response.json();
        const filterData = json.results?.filter((video) => video.type === "Trailer");
        const trailer = filterData?.length ? filterData[0] : json.results?.[0];
        setTrailerKey(trailer?.key);
      } catch (error) {
        console.error("Error fetching video background:", error);
      }
    };

    if (movieId) {
      getMoviesVideos();
    }
  }, [movieId]);

  // Wait 6 seconds for controls to disappear, then reveal the video underneath
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

  return (
    <div className="w-screen h-[75vh] overflow-hidden bg-black relative">
      {trailerKey ? (
        <>
          {/* YouTube iframe — sized to push controls off-screen */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[67.5vw] min-h-[90vh] min-w-[160vh] pointer-events-none">
            <iframe
              className="w-full h-full pointer-events-none"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>

          {/* Movie backdrop image overlay — covers the buffering controls, then fades out */}
          {backdropUrl && (
            <div
              className={`absolute inset-0 z-30 bg-cover bg-center pointer-events-none transition-opacity duration-1500 ${
                hideOverlay ? "opacity-0" : "opacity-100"
              }`}
              style={{ backgroundImage: `url(${backdropUrl})` }}
            ></div>
          )}
        </>
      ) : (
        // Show the backdrop while waiting for the video key to load
        <div
          className="w-screen h-[75vh] bg-cover bg-center"
          style={{
            backgroundImage: backdropUrl ? `url(${backdropUrl})` : "none",
            backgroundColor: backdropUrl ? "transparent" : "#000",
          }}
        ></div>
      )}
    </div>
  );
};

export default VideoBackground;