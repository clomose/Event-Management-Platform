import React, { useState, useEffect } from 'react'
import EventFilters from './EventFilters'
import EventCard from './EventCard'
import HeroSection from './HeroSection'
import axios from 'axios';

const MainPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try{
                // console.log("Fetching events");
                const response = await axios.get('http://localhost:8000/api/v1/event/events', {withCredentials : true});
                setEvents(response.data.data);
                console.log(response.data.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchEvents();
    }, [])

    console.log(events);
  return (
    <>
        <HeroSection />
        <div className='flex w-full h-auto p-6 bg-white rounded-xl shadow-lg space-x-8'>
            <div className='w-[50%] sticky top-0'>
                <EventFilters />
            </div>
            <div className='grid grid-cols-2 gap-4 w-full h-auto p-6 bg-white rounded-xl shadow-lg space-x-8'>
                {
                    events.length > 0 ? events.map((event) => (
                        <EventCard event={event} key={event._id} />
                    )) : <p>No events found</p>
                }

            </div>
        </div>
    </>
  )
}


export default MainPage