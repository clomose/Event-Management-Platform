import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, CalendarCheck, Plus, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DashBoardSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await axios.get("/api/user/logout");
        if(response.status === 200){
            navigate("/login");
        }
    }
  return (
    <div className='flex flex-col w-1/4 p-8 mt-8 bg-white rounded-2xl space-y-6 border border-gray-100 shadow-xl'>
        <div className='w-full mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 text-center'>Event Dashboard</h1>
        </div>
        
        <nav className='space-y-4'>
            <Link to="/dashboard" className='flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <Calendar className='w-5 h-5 text-blue-600 mr-3' />
                <span className='font-medium'>My Events</span>
            </Link>

            <Link to="/dashboard/registered-events" className='flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <CalendarCheck className='w-5 h-5 text-blue-600 mr-3' />
                <span className='font-medium'>Registered Events</span>
            </Link>

            <Link to="/events/create" className='flex items-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200'>
                <Plus className='w-5 h-5 text-blue-600 mr-3' />
                <span className='font-medium'>Create Event</span>
            </Link>
        </nav>

        <div className='flex-grow'></div>

        <div className='space-y-4 border-t pt-6'>
            

            <div onClick={handleLogout} className='flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200'>
                <LogOut className='w-5 h-5 mr-3' />
                <span className='font-medium'>Logout</span>
            </div>
        </div>
    </div>
  )
}

export default DashBoardSidebar

