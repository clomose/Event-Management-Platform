import React from 'react'
import { Calendar, MapPin, User,Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export const EventCard = ({event}) => {

  const navigate = useNavigate();

  return (
    <div className='w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'>
      {/* Event Image */}
      <div className='relative w-full h-48'>
        <img 
          src="https://images.unsplash.com/photo-1738467990752-6e00e436919d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Event" 
          className='w-full h-full object-cover'
        />
      </div>

      {/* Event Details */}
      <div className='p-4 space-y-3'>
        <h2 className='text-xl font-bold text-gray-800'>{event.title}</h2>
        
        <p className='text-sm text-gray-600 line-clamp-2'>
          {event.description}
        </p>
        
        <div className='space-y-1.5'>
          <div className='flex items-center text-gray-700 text-sm'>
            <Calendar className='w-4 h-4 mr-2' />
            <span>{event.date}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm'>
            <Clock className='w-4 h-4 mr-2' />
            <span>{event.time}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm'>
            <MapPin className='w-4 h-4 mr-2' />
            <span>{event.location}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm'>
            <User className='w-4 h-4 mr-2' />
            <p>{event.attendees.length} Attendees</p>
          </div>
        </div>
        <div className='flex justify-between items-center space-x-4'>
            <p className='text-purple-600 bg-purple-100 px-2 py-1 rounded-lg text-sm font-semibold'>Organizer</p>
            <button className='bg-blue-600 text-white py-1.5 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm' onClick={() => navigate(`/events/${event._id}`)}>Register Now</button>
        </div>
      </div>
    </div>
  )
}

export default EventCard;
