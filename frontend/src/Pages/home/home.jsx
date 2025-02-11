import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Find Amazing Events Near You</h1>
          <p className="text-xl mb-8 text-gray-100">Discover, book, and host events that fuel your passions</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Explore Events
          </button>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img src="placeholder.jpg" alt="Event" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Title</h3>
                <p className="text-gray-600 mb-2 flex items-center">
                  <span className="mr-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Date & Time
                </p>
                <p className="text-gray-600 flex items-center">
                  <span className="mr-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  Location
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <span className="block text-indigo-600 text-xl mb-2">🎵</span>
              <span className="font-medium text-gray-800">Music</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <span className="block text-indigo-600 text-xl mb-2">⚽</span>
              <span className="font-medium text-gray-800">Sports</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <span className="block text-indigo-600 text-xl mb-2">💻</span>
              <span className="font-medium text-gray-800">Technology</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <span className="block text-indigo-600 text-xl mb-2">🎨</span>
              <span className="font-medium text-gray-800">Arts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Host Your Own Event?</h2>
          <p className="text-xl mb-8 text-indigo-100">Create and manage your events with our easy-to-use platform</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home