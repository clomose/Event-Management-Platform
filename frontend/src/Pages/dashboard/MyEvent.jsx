import React, { useState, useEffect } from 'react'
import { Edit } from 'lucide-react' // Import edit icon
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyEvent = () => {
  const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/user-events`, {withCredentials : true})
        .then(response => {
            setEvents(response.data.data[0].UserEvents);
            console.log(response.data.data[0]);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        })
  }, [])
  return (
    <div className="p-8 w-full mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white">My Events</h1>
        <p className="text-blue-100 mt-2">Manage your upcoming events and workshops</p>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Event Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Registrations</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              { events.length > 0 && events.map((event) => (
                <tr 
                  key={event._id} 
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50"

                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{event.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {event.attendees} registrations
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors" onClick={() => {
                      navigate(`/events/edit/${event._id}`);
                    }}>
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyEvent