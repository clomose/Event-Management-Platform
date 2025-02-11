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
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/event/events`, {withCredentials: true});
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
        <div className="min-h-screen bg-gray-50">
            <HeroSection />
            
            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-4">
                            <EventFilters />
                        </div>
                    </div>

                    {/* Events Grid */}
                    <div className="lg:w-3/4">
                        {displayEvents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {displayEvents.map((event) => (
                                    <EventCard event={event} key={event._id} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-200">
                                <p className="text-xl text-gray-600 font-medium">No events found</p>
                                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainPage