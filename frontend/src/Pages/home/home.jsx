import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, MapPinned ,BookOpen } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Find Amazing Events Near You</h1>
          <p className="text-xl mb-8 text-gray-100">Discover, book, and host events that fuel your passions</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={() => navigate('/events')}>
            Explore Events
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Event Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <Music className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-4">Music</h3>
              <p className="text-gray-700">Concerts, festivals, and more.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <MapPinned className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-4">Sports</h3>
              <p className="text-gray-700">Games, tournaments, and more.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <BookOpen className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-4">Workshops</h3>
              <p className="text-gray-700">Learn new skills and hobbies.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="bg-indigo-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Host Your Own Event?</h2>
          <p className="text-xl mb-8">Join our community of event organizers and start creating amazing experiences.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;