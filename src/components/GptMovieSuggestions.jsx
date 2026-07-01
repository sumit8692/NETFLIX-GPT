import { useSelector } from "react-redux";
import MovieList from "./MovieList";

// GptMovieSuggestions — shows movie rows below the search panel
// Will be replaced with AI-generated results once Gemini API is integrated
const GptMovieSuggestions = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="mt-6 w-full">
      <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-4 mb-1">
        Browse while you search
      </p>
    </div>
  );
};

export default GptMovieSuggestions;