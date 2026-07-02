import { useState } from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";

// GptSearch — fixed overlay with circular reveal from the button position
const GptSearch = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300); // match gpt-close animation duration
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center pt-28 px-4 pb-8 overflow-y-auto
        ${isClosing ? "gpt-overlay-close" : "gpt-overlay-open"}`}
    >
      {/* Dimmed backdrop — fixed to viewport so it doesn't scroll away */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-md z-0"
        onClick={handleClose}
      />

      {/* Content panel */}
      <div
        className="relative z-10 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <GptSearchBar onClose={handleClose} />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;