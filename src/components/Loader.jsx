const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center">
      {/* Outer spinning ring */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-red-600 animate-spin"></div>
        {/* Inner pulsing red neon dot */}
        <div className="w-6 h-6 rounded-full bg-red-600 shadow-[0_0_15px_#E50914] animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em] mt-6 animate-pulse">
        Loading WebFlix...
      </p>
    </div>
  );
};

export default Loader;
