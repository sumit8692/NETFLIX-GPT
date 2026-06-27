
const VideoTitle = ({ title, overview }) => {
  return (
    <div className='w-screen h-[75vh] flex flex-col justify-end pb-24'>
      {/* Left-to-right gradient background behind the text */}
      <div className='absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none'></div>

      {/* Text content sitting on top of the gradient */}
      <div className='relative z-10 px-16 w-[55%]'>
        <h1 className='text-5xl font-bold text-white drop-shadow-lg'>{title}</h1>
        <p className='py-4 text-lg text-gray-200 leading-relaxed line-clamp-3'>{overview}</p>
        <div className='flex gap-3 mt-2'>
          <button className='bg-white text-black px-8 py-2.5 rounded-md font-semibold text-lg hover:bg-gray-200 transition-colors cursor-pointer'>
            ▶ Play
          </button>
          <button className='bg-gray-500/70 text-white px-8 py-2.5 rounded-md font-semibold text-lg hover:bg-gray-500/90 transition-colors cursor-pointer backdrop-blur-sm'>
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoTitle