import React from 'react'

const HeroSection = () => {
  return (
    <div className='w-full min-h-[60vh] bg-gray-100 flex flex-col items-center justify-center gap-6 py-16 px-4'>
      {/* Hero Content */}
      <div className='max-w-4xl text-center space-y-4'>
        <h1 className='text-5xl md:text-6xl font-bold text-gray-800'>
          Discover Exciting Events
        </h1>
        <p className='text-xl md:text-2xl font-semibold text-gray-600 mb-8'>
          Join the fun and make memories!
        </p>
        
        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
          
          <button className='px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors'>
            Create Event
          </button>
        </div>

        {/* Features Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
          <div className='p-6 bg-white rounded-lg shadow-sm'>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Find Local Events</h3>
            <p className='text-gray-600'>Discover amazing events happening in your area</p>
          </div>
          <div className='p-6 bg-white rounded-lg shadow-sm'>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Connect with People</h3>
            <p className='text-gray-600'>Meet like-minded individuals and make new friends</p>
          </div>
          <div className='p-6 bg-white rounded-lg shadow-sm'>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>Create Memories</h3>
            <p className='text-gray-600'>Experience unforgettable moments together</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection