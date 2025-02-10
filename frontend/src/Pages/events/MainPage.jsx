import React, { useState, useEffect } from 'react'
import EventFilters from './EventFilters'
import EventCard from './EventCard'
import HeroSection from './HeroSection'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredData, applyFilters } from '../../redux/slices/filter';

const MainPage = () => {
    const [events, setEvents] = useState([]);
    const [user,setUser] = useState(null);
    const dispatch = useDispatch();
    const filteredData = useSelector(state => state.filter.filteredData);
    const appliedFilters = useSelector(state => state.filter.appliedFilters);
    console.log("filteredData", filteredData);
    console.log("appliedFilters", appliedFilters);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/event/events', {withCredentials: true});
                setEvents(response.data.data);
                console.log("response.data.data", response.data.data);
                dispatch(setFilteredData([]));
                dispatch(applyFilters(false));
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchEvents();
    }, [dispatch])

    const displayEvents = appliedFilters ? filteredData : events;

    return (
        <>
            <HeroSection />
            <div className='flex w-full h-auto p-6 bg-white rounded-xl shadow-lg space-x-8'>
                <div className='w-[50%] sticky top-0'>
                    <EventFilters />
                </div>
                <div className='grid grid-cols-2 gap-4 w-full h-auto p-6 bg-white rounded-xl shadow-lg space-x-8'>
                    {displayEvents.length > 0 ? (
                        displayEvents.map((event) => (
                            <EventCard event={event} key={event._id} />
                        ))
                    ) : (
                        <p>No events found</p>
                    )}
                </div>
            </div>
        </>
    )
}
export default MainPage