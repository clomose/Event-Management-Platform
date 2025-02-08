import React from 'react'
import { Calendar, MapPin, Search, Tag, ChevronRight } from 'lucide-react'

const EventFilters = () => {
  const eventTypes = ['conference', 'workshop', 'networking', 'social']

  return (
    <div className='flex flex-col max-w-[40%] h-full bg-white rounded-xl p-6 space-y-8 border border-gray-100 shadow-lg sticky top-0'>
        <div className='w-full h-auto space-y-2'>
            <div className='flex items-center gap-2'>
                <Search className='w-5 h-5 text-blue-600' />
                <label htmlFor="search" className='text-lg font-bold text-gray-900'>Search Events</label>
            </div>
            <input type="text" placeholder='Search Events' className='w-full h-auto p-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all' />
        </div>
        {/* Event Type Section */}
        <div className='flex flex-col w-full space-y-4'>
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          <h2 className='text-lg font-bold text-gray-900'>Event Type</h2>
        </div>
        <div className='space-y-2 grid grid-cols-2 gap-2'>
          {eventTypes.map((type) => (
            <label key={type} className='flex items-center space-x-3 cursor-pointer group' >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className='w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -right-4" />
              </div>
              <span className='text-gray-700 capitalize text-sm group-hover:text-blue-600 transition-colors'>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range Section */}
      <div className='flex flex-col w-full space-y-4'>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <h2 className='text-lg font-bold text-gray-900'>Date Range</h2>
        </div>
        <div className='space-y-3'>
          <div className='flex flex-col space-y-2'>
            <label className='text-sm text-gray-600 font-medium'>Start Date</label>
            <input
              type="date"
              className='border border-gray-200 rounded-lg p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all'
            />
          </div>
          
        </div>
      </div>

      {/* Location Section */}
      <div className='flex flex-col w-full space-y-4'>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <h2 className='text-lg font-bold text-gray-900'>Location</h2>
        </div>
        <input
          type="text"
          placeholder="Enter location..."
          className='border border-gray-200 rounded-lg p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all'
        />
      </div>

      {/* Apply Filters Button */}
      <button className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:translate-y-[-1px] active:translate-y-[1px] font-medium shadow-md hover:shadow-lg'>
        Apply Filters
      </button>
    </div>
  )
}

export default EventFilters