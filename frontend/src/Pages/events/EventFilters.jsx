import React from 'react'
import { Calendar, MapPin, Search, Tag, ChevronRight } from 'lucide-react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilteredData, applyFilters } from '../../redux/slices/filter';
import axios from 'axios';
import toast from 'react-hot-toast';

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
    toast.success('Filters applied successfully')
  }
  const handleClearFilters = () => {
    dispatch(setFilteredData([]))
    dispatch(applyFilters(false))
    setSearch('')
    setEventType('')
    setTimeFilter('')

  }
  return (
    <div className='flex flex-col w-full h-auto bg-white rounded-xl p-6 space-y-6 border border-gray-200 shadow-sm sticky top-4'>
      {/* Search Section */}
      <div className='w-full h-auto space-y-2'>
        <div className='flex items-center gap-2'>
          <Search className='w-4 h-4 text-gray-500' />
          <label htmlFor="search" className='text-base font-semibold text-gray-700'>Search Events</label>
        </div>
        <div className='relative'>
          <input 
            type="text" 
            value={search}
            placeholder='Search by event name...' 
            className='w-full h-10 pl-4 pr-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm' 
            onChange={(e) => setSearch(e.target.value)} 
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Event Type Section */}
      <div className='flex flex-col w-full space-y-3'>
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-500" />
          <h2 className='text-base font-semibold text-gray-700'>Event Type</h2>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {eventTypes.map((type) => (
            <label 
              key={type} 
              className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${
                eventType === type 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'hover:bg-gray-50 border-transparent'
              } border`}
            >
              <input
                type="checkbox"
                className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                onChange={(e) => setEventType(e.target.checked ? type : '')}
                checked={eventType === type}
              />
              <span className='ml-2 text-sm capitalize'>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Filter Section */}
      <div className='flex flex-col w-full space-y-3'>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <h2 className='text-base font-semibold text-gray-700'>Time</h2>
        </div>
        <div className='flex gap-2'>
          {timeFilters.map((filter) => (
            <label 
              key={filter} 
              className={`flex flex-1 items-center p-2 rounded-lg cursor-pointer transition-all ${
                timeFilter === filter 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'hover:bg-gray-50 border-transparent'
              } border`}
            >
              <input
                type="radio"
                name="timeFilter"
                className='w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500'
                onChange={(e) => setTimeFilter(e.target.checked ? filter : '')}
                checked={timeFilter === filter}
              />
              <span className='ml-2 text-sm capitalize'>{filter}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons Section */}
      <div className='flex flex-col gap-2 pt-2'>
        <button 
          className='w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed' 
          onClick={handleApplyFilters}
          disabled={!search && !eventType && !timeFilter}
        >
          Apply Filters
        </button>
        <button 
          className='w-full bg-gray-50 text-gray-700 py-2.5 rounded-lg hover:bg-gray-100 transition-all font-medium text-sm border border-gray-200' 
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default EventFilters