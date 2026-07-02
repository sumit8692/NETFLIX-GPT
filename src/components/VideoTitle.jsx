const VideoTitle = ({ title, overview }) => {
  return (
    <div className='w-full h-[75vh] flex flex-col justify-end pb-8 md:pb-24 px-6 md:px-16'>
      {/* Left-to-right gradient background behind the text */}
      <div className='absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none'></div>

      {/* Text content sitting on top of the gradient */}
      <div className='relative z-10 w-full md:w-[50%]'>
        <h1 className='text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight'>
          {title}
        </h1>
        
        {/* Overview: hidden on mobile, visible and safely clamped on desktop */}
        <p className='hidden md:block py-4 text-base md:text-lg text-gray-200 leading-relaxed max-w-xl line-clamp-3'>
          {overview}
        </p>
        
        <div className='flex gap-3 mt-4 md:mt-2'>
          <button className='bg-white text-black px-5 md:px-8 py-2 md:py-2.5 rounded-md font-semibold text-sm md:text-lg hover:bg-gray-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center'>
            ▶ Play
          </button>
          <button className='bg-gray-500/70 text-white px-5 md:px-8 py-2 md:py-2.5 rounded-md font-semibold text-sm md:text-lg hover:bg-gray-500/90 active:scale-95 transition-all cursor-pointer backdrop-blur-sm flex items-center justify-center'>
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoTitle;