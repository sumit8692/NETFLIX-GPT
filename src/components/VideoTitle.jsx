

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='absolute text-white pt-48 px-24'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='py-6 w-1/2'>{overview}</p>
      <div className='flex gap-2'>
        <button className='bg-white text-black px-12 py-2 mx-2 rounded-lg hover:bg-opacity-80 cursor-pointer'>Play</button>
        <button className='bg-white text-black px-12 py-2 mx-2 rounded-lg hover:bg-opacity-80 cursor-pointer'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle