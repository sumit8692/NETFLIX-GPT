import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import openai, { getActiveApiKey } from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovies } from "../utils/gptSlice";

const SUGGESTED_SEARCHES = [
  "Action movies like John Wick",
  "Best sci-fi of the decade",
  "Romantic comedies",
  "Christopher Nolan films",
  "Horror movies to watch alone",
];

const GPT_SYSTEM_PROMPT =
  "You are a movie recommendation expert. Based on the user's query, suggest exactly 5 popular movie titles. " +
  "Return ONLY a comma-separated list of movie names, nothing else. " +
  "Example: Inception, The Matrix, Interstellar, Tenet, Avatar";

// GptSearchBar — the frosted glass spotlight panel
const GptSearchBar = ({ onClose }) => {
  const searchRef = useRef(null);
  const keyInputRef = useRef(null);
  const dispatch = useDispatch();
  
  const [isSearching, setIsSearching] = useState(false);
  const [hasKey, setHasKey] = useState(!!getActiveApiKey());
  const [showSettings, setShowSettings] = useState(false);

  const handleSearch = async () => {
    if (!hasKey) return;
    const query = searchRef.current?.value?.trim();
    if (!query || isSearching) return;

    setIsSearching(true);
    try {
      const gptResult = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: GPT_SYSTEM_PROMPT },
          { role: "user", content: query },
        ],
      });

      const movieText = gptResult.choices[0]?.message?.content ?? "";
      const movieNames = movieText
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean)
        .slice(0, 5);

      const tmdbSearches = movieNames.map((name) =>
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(name)}&page=1`,
          API_OPTIONS
        ).then((res) => res.json())
      );

      const tmdbResults = await Promise.all(tmdbSearches);
      const movieResults = tmdbResults.map((r) => r.results ?? []);

      dispatch(addGptMovies({ movieNames, movieResults }));
    } catch (err) {
      console.error("GPT Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveKey = () => {
    const key = keyInputRef.current?.value?.trim();
    if (!key) return;
    localStorage.setItem("user_openai_key", key);
    setHasKey(true);
    setShowSettings(false);
  };

  const handleRemoveKey = () => {
    localStorage.removeItem("user_openai_key");
    // Also clear input value
    if (keyInputRef.current) keyInputRef.current.value = "";
    setHasKey(!!getActiveApiKey());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && onClose) onClose();
    if (e.key === "Enter" && hasKey) handleSearch();
  };

  const handleChipClick = (text) => {
    if (!hasKey) return;
    if (searchRef.current) {
      searchRef.current.value = text;
      searchRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Label */}
      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 text-center">
        Netflix GPT · AI Movie Search
      </p>

      {/* Frosted glass search box */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/15 shadow-[0_8px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300">
        
        {/* API Key Missing Alert Banner */}
        {!hasKey && (
          <div className="bg-red-500/20 border-b border-red-500/30 px-5 py-3 flex items-center justify-between text-xs text-red-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>OpenAI API Key is missing. Smart search is currently disabled.</span>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-2 cursor-pointer transition-colors"
            >
              Configure Key
            </button>
          </div>
        )}

        {/* API Key configuration panel */}
        {(showSettings || !hasKey) && (
          <div className="bg-black/40 border-b border-white/10 px-5 py-4 transition-all duration-300">
            <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
              OpenAI API Key Settings
            </h3>
            <p className="text-xs text-white/50 mb-3 leading-relaxed">
              To use AI Search, paste your personal OpenAI API Key below. The key is saved locally in your browser and never sent anywhere else.
            </p>
            <div className="flex gap-2">
              <input
                ref={keyInputRef}
                type="password"
                placeholder={localStorage.getItem("user_openai_key") ? "••••••••••••••••" : "Paste your sk-... key here"}
                className="flex-1 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white text-xs outline-none transition-all placeholder-white/30"
              />
              <button
                onClick={handleSaveKey}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Save
              </button>
              {localStorage.getItem("user_openai_key") && (
                <button
                  onClick={handleRemoveKey}
                  className="bg-white/5 hover:bg-white/10 text-red-400 hover:text-red-300 text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer border border-white/10"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>
        )}

        {/* Input row */}
        <div className="flex items-center px-5 py-4 gap-3">
          {/* Status Spinner or Search Icon */}
          {isSearching ? (
            <svg
              className="w-5 h-5 text-red-500 flex-shrink-0 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white/50 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          )}

          <input
            ref={searchRef}
            type="text"
            placeholder={hasKey ? "Ask me anything about movies…" : "Please configure your OpenAI key above first"}
            className="flex-1 bg-transparent text-white text-lg placeholder-white/30 outline-none caret-red-500 disabled:opacity-50"
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={isSearching || !hasKey}
          />

          <div className="flex items-center gap-2">
            {/* Show gear settings button when key is configured */}
            {hasKey && (
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer ${showSettings ? "bg-white/5 text-white" : ""}`}
                title="API Settings"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}

            <button
              onClick={handleSearch}
              disabled={isSearching || !hasKey}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:bg-gray-700 disabled:text-white/40 disabled:cursor-not-allowed active:scale-95 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-150 flex-shrink-0"
            >
              {isSearching ? "Searching…" : "Search"}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mx-5" />

        {/* Suggested search chips */}
        <div className="px-5 py-3 flex flex-wrap gap-2">
          {SUGGESTED_SEARCHES.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleChipClick(suggestion)}
              disabled={!hasKey}
              className="text-xs text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-all duration-150"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="text-white/20 text-xs text-center mt-3">
        {hasKey ? (
          <>
            Press{" "}
            <kbd className="bg-white/10 text-white/40 px-1.5 py-0.5 rounded text-xs font-mono">↵ Enter</kbd>
            {" "}to search · Press{" "}
            <kbd className="bg-white/10 text-white/40 px-1.5 py-0.5 rounded text-xs font-mono">Esc</kbd>
            {" "}to close
          </>
        ) : (
          "Please configure your OpenAI key to enable keyboard shortcuts"
        )}
      </p>
    </div>
  );
};

export default GptSearchBar;