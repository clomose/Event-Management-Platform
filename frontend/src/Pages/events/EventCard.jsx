import React from 'react'
import { Calendar, MapPin, User,Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EventCard = ({event}) => {

  const navigate = useNavigate();

  return (
    <div 
      className='w-full bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer' 
      onClick={() => navigate(`/events/${event._id}`)}
    >
      {/* Event Image */}
      <div className='relative w-full h-56'>
        <img 
          src={event.image} 
          alt="Event" 
          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
        />
        <div className='absolute top-4 right-4'>
          <span className='px-4 py-1.5 bg-white/90 backdrop-blur-sm text-blue-700 rounded-full text-sm font-semibold shadow-md'>
            {new Date(event?.date) > new Date() ? "Upcoming" : "Past"}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className='p-6 space-y-4'>
        <h2 className='text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300'>
          {event.title}
        </h2>
        
        <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed'>
          {event.shortDescription}
        </p>
        
        <div className='space-y-2.5'>
          <div className='flex items-center text-gray-700 text-sm hover:text-blue-600 transition-colors duration-200'>
            <Calendar className='w-5 h-5 mr-3' />
            <span className='font-medium'>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm hover:text-blue-600 transition-colors duration-200'>
            <Clock className='w-5 h-5 mr-3' />
            <span className='font-medium'>{event.time}</span>
          </div>
          <div className='flex items-center text-gray-700 text-sm hover:text-blue-600 transition-colors duration-200'>
            <User className='w-5 h-5 mr-3' />
            <p className='font-medium'>{event.attendees} Attendees</p>
          </div>
        </div>

        <div className='flex justify-between items-center pt-2'>
          <p className='text-purple-600 bg-purple-50 px-4 py-2 rounded-lg text-sm font-semibold ring-1 ring-purple-100'>
            By {event.createdBy.name}
          </p>
          <button 
            className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-300 text-sm font-semibold shadow-md hover:shadow-lg'
            onClick={(e) => {
              e.stopPropagation();
              // Add registration logic here
            }}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard;
