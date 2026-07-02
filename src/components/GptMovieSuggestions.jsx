import { useSelector } from "react-redux";
import MovieList from "./MovieList";

// GptMovieSuggestions — shows either:
//   • AI-recommended results (when gptMovies is populated in Redux)
//   • Default browse rows (before any search is made)
const GptMovieSuggestions = () => {
  const gptMovies = useSelector((store) => store.gpt.gptMovies);
  const movies = useSelector((store) => store.movies);

  // If GPT results exist, show them as labelled rows
  if (gptMovies) {
    const { movieNames, movieResults } = gptMovies;
    return (
      <div className="mt-6 w-full">
        <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-4 mb-1">
          AI Recommendations
        </p>
        {movieNames.map((name, i) => (
          <MovieList
            key={name}
            title={name}
            movies={movieResults[i]}
          />
        ))}
      </div>
    );
  }

  // Default: show curated browse rows while the user hasn't searched yet
  return (
    <div className="mt-6 w-full">
      <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-4 mb-1">
        Browse while you search
      </p>
    </div>
  );
};

export default GptMovieSuggestions;