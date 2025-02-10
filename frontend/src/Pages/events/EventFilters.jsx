import React from 'react'
import { Calendar, MapPin, Search, Tag, ChevronRight } from 'lucide-react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilteredData, applyFilters } from '../../redux/slices/filter';
import axios from 'axios';

const EventFilters = () => {
  const dispatch = useDispatch()
  const eventTypes = ['music', 'sports', 'food', 'art', 'technology', 'other']
  const timeFilters = ['upcoming', 'past']
  const [search, setSearch] = useState('');
  const [eventType, setEventType] = useState('');
  const [timeFilter, setTimeFilter] = useState('');


  const handleApplyFilters = async () => {
    const response = await axios.post(`http://localhost:8000/api/v1/event/events/filter`, {
      search,
      eventType,
      timeFilter,
    },
    {withCredentials : true}
    )
    dispatch(setFilteredData(response.data.data))
    dispatch(applyFilters(true))
  }
  const handleClearFilters = () => {
    dispatch(setFilteredData([]))
    dispatch(applyFilters(false))
    setSearch('')
    setEventType('')
    setTimeFilter('')

  }
  return (
    <div className='flex flex-col w-full h-auto bg-white rounded-xl p-6 space-y-8 border border-gray-100 shadow-lg sticky top-0'>
        <div className='w-full h-auto space-y-2'>
            <div className='flex items-center gap-2'>
                <Search className='w-5 h-5 text-blue-600' />
                <label htmlFor="search" className='text-lg font-bold text-gray-900'>Search Events</label>
            </div>
            <input type="text" placeholder='Search Events' className='w-full h-auto p-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all' onChange={(e) => setSearch(e.target.value)} />
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
                  onChange={(e) => setEventType(e.target.checked ? type : '')}
                  checked={eventType === type}
                />
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -right-4" />
              </div>
              <span className='text-gray-700 capitalize text-sm group-hover:text-blue-600 transition-colors'>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Filter Section */}
      <div className='flex flex-col w-full space-y-4'>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <h2 className='text-lg font-bold text-gray-900'>Time</h2>
        </div>
        <div className='space-y-2'>
            <div className='flex items-center gap-2'>
            {timeFilters.map((filter) => (
            <label key={filter} className='flex items-center space-x-3 cursor-pointer group'>
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="timeFilter"
                  className='w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500'
                  onChange={(e) => setTimeFilter(e.target.checked ? filter : '')}
                  checked={timeFilter === filter}
                />
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -right-4" />
              </div>
              <span className='text-gray-700 capitalize text-sm group-hover:text-blue-600 transition-colors'>{filter}</span>
            </label>
          ))}
          </div>
        </div>
      </div>


      {/* Apply Filters Button */}
      <button className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:translate-y-[-1px] active:translate-y-[1px] font-medium shadow-md hover:shadow-lg' onClick={handleApplyFilters}>
        Apply Filters
      </button>
      <button className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:translate-y-[-1px] active:translate-y-[1px] font-medium shadow-md hover:shadow-lg' onClick={handleClearFilters}>Clear Filters</button>
    </div>
  )
}

export default EventFilters