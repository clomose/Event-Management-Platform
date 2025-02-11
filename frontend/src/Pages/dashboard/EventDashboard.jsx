import React from 'react'
import DashBoardSidebar from './DashBoardSidebar'
import { Outlet } from 'react-router-dom'

const EventDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className='container mx-auto'>
        <div className='flex gap-6 p-4 md:p-8'>
          <DashBoardSidebar />
          <div className='flex-1 min-h-[calc(100vh-4rem)]'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDashboard