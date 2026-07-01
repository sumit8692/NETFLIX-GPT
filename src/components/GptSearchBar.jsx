import { useRef } from "react";

const SUGGESTED_SEARCHES = [
  "Action movies like John Wick",
  "Best sci-fi of the decade",
  "Romantic comedies",
  "Christopher Nolan films",
  "Horror movies to watch alone",
];

// GptSearchBar — the frosted glass spotlight panel
// Accepts onClose so Escape key can trigger the overlay close animation
const GptSearchBar = ({ onClose }) => {
  const searchRef = useRef(null);

  const handleSearch = () => {
    const query = searchRef.current?.value?.trim();
    if (!query) return;
    // TODO: integrate Gemini API
    console.log("GPT Search query:", query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && onClose) onClose();
    if (e.key === "Enter") handleSearch();
  };

  const handleChipClick = (text) => {
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
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/15 shadow-[0_8px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Input row */}
        <div className="flex items-center px-5 py-4 gap-3">
          {/* Magnifying glass icon */}
          <svg
            className="w-5 h-5 text-white/50 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>

          <input
            ref={searchRef}
            type="text"
            placeholder="Ask me anything about movies…"
            className="flex-1 bg-transparent text-white text-lg placeholder-white/30 outline-none caret-red-500"
            onKeyDown={handleKeyDown}
            autoFocus
          />

          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-150 flex-shrink-0"
          >
            Search
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mx-5" />

        {/* Suggested search chips */}
        <div className="px-5 py-3 flex flex-wrap gap-2">
          {SUGGESTED_SEARCHES.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleChipClick(suggestion)}
              className="text-xs text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-all duration-150"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="text-white/20 text-xs text-center mt-3">
        Press{" "}
        <kbd className="bg-white/10 text-white/40 px-1.5 py-0.5 rounded text-xs font-mono">
          ↵ Enter
        </kbd>{" "}
        to search · Press{" "}
        <kbd className="bg-white/10 text-white/40 px-1.5 py-0.5 rounded text-xs font-mono">
          Esc
        </kbd>{" "}
        to close
      </p>
    </div>
  );
};

export default GptSearchBar;