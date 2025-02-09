import React, {useState, useEffect} from 'react'
import {Users, Eye, Calendar, CheckCircle} from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
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

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`http://localhost:8000/api/v1/event/event/${id}`, {withCredentials : true});
            setEvent(response.data.data);
            console.log(response.data.data);
        }
        fetchEvent();
    }, [])
  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-50 py-10 w-full space-y-8'>
        <div className='w-[80%] h-96 rounded-xl overflow-hidden shadow-lg'>
            <img src="https://images.unsplash.com/photo-1738467990752-6e00e436919d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                 alt="event" 
                 className='w-full h-full object-cover hover:scale-105 transition-transform duration-500 hover:cursor-pointer' />
        </div>
        <div className='flex justify-center w-[80%] h-full p-6 bg-white rounded-xl shadow-lg space-x-8'>
            <div className='flex flex-col items-start justify-start w-[60%] h-full p-8 space-y-8'>
                <div className='space-y-3'>
                    <h1 className='text-4xl font-bold text-gray-900'>{event?.title}</h1>
                    <p className='text-lg text-gray-600 flex items-center'>
                        <span className='mr-2'>Hosted by</span>
                        <span className='font-semibold text-blue-600'>{event?.createdBy?.name}</span>
                    </p>
                </div>

                <div className='space-y-4'>
                    <h2 className='text-2xl font-semibold text-gray-800'>About this event</h2>
                    <p className='text-gray-600 leading-relaxed text-lg'>
                        {event?.description}
                    </p>
                </div>

                {/* <div className='space-y-4'>
                    <h2 className='text-2xl font-semibold text-gray-800'>What to expect</h2>
                    <ul className='space-y-3 text-gray-600'>
                        {event?.expectations.map((item, index) => (
                            <li key={index} className='flex items-center'>
                                <span className='h-2 w-2 bg-blue-500 rounded-full mr-3'></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div> */}

                <div className='pt-6'>
                    <button className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5' onClick={handleRegister}>
                        {isLoading ? "Registering..." : "Register Now"}
                        {isRegistered && <CheckCircle className='w-4 h-4 text-green-500 ml-2'/>}
                    </button>
                </div>
            </div>
            
            <div className='flex flex-col w-[40%] h-fit bg-white rounded-xl p-6 space-y-6 border border-gray-100'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-2xl font-bold text-gray-900'>Event Details</h2>
                    <span className='px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold'>Paid</span>
                </div>
                
                <div className='space-y-4'>
                    <div className='flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                        <Users className='w-8 h-8 text-blue-600'/>
                        <div className='ml-4'>
                            <h3 className='text-sm text-gray-500'>Registered</h3>
                            <p className='font-bold text-xl text-gray-900'>{event?.attendees}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                        <Eye className='w-8 h-8 text-blue-600'/>
                        <div className='ml-4'>
                            <h3 className='text-sm text-gray-500'>Impressions</h3>
                            <p className='font-bold text-xl text-gray-900'>{event?.impressions}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                        <Calendar className='w-8 h-8 text-blue-600'/>
                        <div className='ml-4'>
                            <h3 className='text-sm text-gray-500'>Event Date</h3>
                            <p className='font-bold text-xl text-gray-900'>{new Date(event?.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventPage