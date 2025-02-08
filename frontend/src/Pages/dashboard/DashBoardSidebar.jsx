import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, CalendarCheck, Plus, Settings, LogOut } from 'lucide-react'

const DashBoardSidebar = () => {
  return (
    <div className='flex flex-col w-1/4 p-8 mt-8 bg-white rounded-2xl space-y-6 border border-gray-100 shadow-xl'>
        <div className='w-full mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 text-center'>Event Dashboard</h1>
        </div>
        
        <nav className='space-y-4'>
            <Link to="/dashboard/my-events" className='flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <Calendar className='w-5 h-5 text-blue-600 mr-3' />
                <span className='font-medium'>My Events</span>
            </Link>

            <Link to="/dashboard/registered-events" className='flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <CalendarCheck className='w-5 h-5 text-blue-600 mr-3' />
                <span className='font-medium'>Registered Events</span>
            </Link>

            <Link to="/dashboard/create-event" className='flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <Plus className='w-5 h-5 text-blue-600 mr-3' />
                <span className='font-medium'>Create Event</span>
            </Link>
        </nav>

        <div className='flex-grow'></div>

        <div className='space-y-4 border-t pt-6'>
            <Link to="/dashboard/settings" className='flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <Settings className='w-5 h-5 text-blue-600 mr-3' />
                <span className='font-medium'>Settings</span>
            </Link>

            <Link to="/dashboard/logout" className='flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200'>
                <LogOut className='w-5 h-5 mr-3' />
                <span className='font-medium'>Logout</span>
            </Link>
        </div>
    </div>
  )
}

export default DashBoardSidebar

