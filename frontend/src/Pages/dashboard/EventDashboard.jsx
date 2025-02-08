import React from 'react'
import DashBoardSidebar from './DashBoardSidebar'
import MyEvent from './MyEvent'

const EventDashboard = () => {
  return (
    <div className='w-full h-full flex m-auto'>
        <DashBoardSidebar />
        <MyEvent />
    </div>

  )
}

export default EventDashboard