import React, {useState, useEffect} from 'react'
import {Users, Eye, Calendar, CheckCircle,} from 'lucide-react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';

const EventPage = () => {
    const socket = useSocket();
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        console.log("Registering for event", id);
        setIsLoading(true);
        const response = await axios.post(`http://localhost:8000/api/v1/user/register-to-event/${id}`,{}, {withCredentials : true});
        setIsLoading(false);
        if(response.status === 200){
            setIsRegistered(true);
        }
    }

    const incrementImpressions = async () => {
        try {
            await axios.post(`http://localhost:8000/api/v1/event/increment-impression/${id}`, {}, 
                {withCredentials: true}
            );

        } catch (error) {
            console.error("Error incrementing impressions:", error);
        }
    };

    useEffect(() => {
        if(!socket) return;
        const handleEventRegistered = (data) => {
            if(data.eventId === id){
                setEvent(prevEvent => ({
                    ...prevEvent,
                    attendees : data.totalAttendees
                }));
            }
        }
        socket.on('event-registered', handleEventRegistered);
        return () => {
            socket.off('event-registered', handleEventRegistered);
        }
    }, [socket]);

    useEffect(() => {
        if (!socket) return;

        const handleEventImpression = (data) => {
            if (data.eventId === id) {
                setEvent(prevEvent => ({
                    ...prevEvent,
                    impressions: data.totalImpressions
                }));
            }
        };

        socket.on('event-impression', handleEventImpression);

        return () => {
            socket.off('event-impression', handleEventImpression);
        };
    }, [socket, id]);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`http://localhost:8000/api/v1/event/event/${id}`, {withCredentials : true});
            setEvent(response.data.data);
            console.log(response.data.data);
        }
        fetchEvent();
        incrementImpressions();
    }, [id])
  return (
    <div className='flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 w-full space-y-12'>
        <div className='w-[85%] max-w-7xl h-[500px] rounded-2xl overflow-hidden shadow-2xl transform hover:-translate-y-1 transition-all duration-500'>
            <img src={event?.image} 
                 alt="event" 
                 className='w-full h-full object-cover hover:scale-105 transition-all duration-700 hover:cursor-pointer' />
        </div>
        <div className='flex justify-center w-[85%] max-w-7xl h-full p-8 bg-white rounded-2xl shadow-xl space-x-12 hover:shadow-2xl transition-all duration-300'>
            <div className='flex flex-col items-start justify-start w-[60%] h-full p-8 space-y-10'>
                <div className='space-y-4'>
                    <div className='flex items-center justify-between w-full'>
                        <h1 className='text-5xl font-bold text-gray-900 leading-tight'>{event?.title}</h1>
                    </div>
                    <p className='text-xl text-gray-600 flex items-center'>
                        <span className='mr-2'>Hosted by</span>
                        <span className='font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors'>{event?.createdBy?.name}</span>
                    </p>
                </div>

                <div className='space-y-6'>
                    <h2 className='text-3xl font-semibold text-gray-800'>About this event</h2>
                    <p className='text-gray-600 leading-relaxed text-xl'>
                        {event?.description}
                    </p>
                </div>

                <div className='pt-8'>
                    <button 
                        className={`${
                            isRegistered 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        } text-white px-10 py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 text-lg`} 
                        onClick={handleRegister}
                    >
                        <span>{isLoading ? "Registering..." : isRegistered ? "Registered" : "Register Now"}</span>
                        {isRegistered && <CheckCircle className='w-5 h-5 text-white ml-2'/>}
                    </button>
                </div>
            </div>
            
            <div className='flex flex-col w-[40%] h-fit bg-white rounded-xl p-8 space-y-8 border border-gray-200 hover:border-blue-200 transition-all duration-300 shadow-lg'>
                <div className='flex flex-col space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-3xl font-bold text-gray-900'>Event Details</h2>
                        <span className={`px-5 py-2 ${
                            new Date(event?.date) > new Date() 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-gray-100 text-gray-700'
                        } rounded-full text-sm font-semibold`}>
                            {new Date(event?.date) > new Date() ? "Upcoming" : "Past"}
                        </span>
                    </div>
                    <div className='px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold w-fit'>{event?.category}</div>
                </div>
                
                <div className='space-y-6'>
                    <div className='flex items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 group cursor-pointer'>
                        <Users className='w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform'/>
                        <div className='ml-6'>
                            <h3 className='text-sm font-medium text-gray-500'>Registered</h3>
                            <p className='font-bold text-2xl text-gray-900'>{event?.attendees}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 group cursor-pointer'>
                        <Eye className='w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform'/>
                        <div className='ml-6'>
                            <h3 className='text-sm font-medium text-gray-500'>Impressions</h3>
                            <p className='font-bold text-2xl text-gray-900'>{event?.impressions}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 group cursor-pointer'>
                        <Calendar className='w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform'/>
                        <div className='ml-6'>
                            <h3 className='text-sm font-medium text-gray-500'>Event Date</h3>
                            <p className='font-bold text-2xl text-gray-900'>{new Date(event?.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventPage