import React from 'react'
import EventFilters from './EventFilters'
import EventCard from './EventCard'
import HeroSection from './HeroSection'

const MainPage = () => {
  return (
    <>
        <HeroSection />
        <div className='flex w-full h-auto p-6 bg-white rounded-xl shadow-lg space-x-8'>
            <EventFilters />
            <div className='grid grid-cols-2 gap-4 w-full h-auto p-6 bg-white rounded-xl shadow-lg space-x-8'>
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />

            </div>
        </div>
    </>
  )
}


export default MainPage