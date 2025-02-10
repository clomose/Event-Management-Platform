import React from 'react'
import { Calendar, MapPin, User,Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EventCard = ({event}) => {

  const navigate = useNavigate();

  return (
    <div className='w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden' onClick={() => navigate(`/events/${event._id}`)}>
      {/* Event Image */}
      <div className='relative w-full h-48'>
        <img 
          src={event.image} 
          alt="Event" 
          className='w-full h-full object-cover'
        />
      </div>

      {/* Event Details */}
      <div className='p-4 space-y-3'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold text-gray-800'>{event.title}</h2>
          <span className='px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold'>{new Date(event?.date) > new Date() ? "Upcoming" : "Past"}</span>
        </div>
        
        <p className='text-sm text-gray-600 line-clamp-2'>
          {event.shortDescription}
        </p>
        
        <div className='space-y-1.5'>
          <div className='flex items-center text-gray-700 text-sm'>
            <Calendar className='w-4 h-4 mr-2' />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm'>
            <Clock className='w-4 h-4 mr-2' />
            <span>{event.time}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm'>
            <User className='w-4 h-4 mr-2' />
            <p>{event.attendees} Attendees</p>
          </div>
        </div>
        <div className='flex justify-between items-center space-x-4'>
            <p className='text-purple-600 bg-purple-100 px-2 py-1 rounded-lg text-sm font-semibold'>Organized by {event.createdBy.name}</p>
            <button className='bg-blue-600 text-white py-1.5 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm'>Register Now</button>
        </div>
      </div>
    </div>
  )
}

export default EventCard;
