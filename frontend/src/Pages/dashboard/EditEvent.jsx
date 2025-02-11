import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditEvent = () => {
    const {id} = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/event/event/${id}`, {withCredentials: true})
        .then((response) => {
            setEvent(response.data.data);
            console.log(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching event:', error);
            // navigate('/dashboard');
        });
    }, [id, navigate]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", e.target.title.value);
        formData.append("description", e.target.description.value);
        formData.append("category", e.target.category.value);
        formData.append("date", e.target.date.value);
        formData.append("time", e.target.time.value);
        formData.append("shortDescription", e.target.shortDescription.value);
        if (image) {
            formData.append("image", image);
        }

        axios.put(`http://localhost:8000/api/v1/event/update-event/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        })
        .then(response => {
            toast.success('Event updated successfully');
            console.log(response);
            navigate('/dashboard');
        })
        .catch(error => {
            console.error('Error updating event:', error);
        });
    }

    // if (!event) return <div>Loading...</div>;

    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-2xl mx-auto'>
                <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                    {/* Header Section */}
                    <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6'>
                        <h1 className='text-4xl font-bold text-white mb-2'>Edit Event</h1>
                        <p className='text-indigo-100'>Update the event details below</p>
                    </div>

                    {/* Form Section */}
                    <div className='p-8'>
                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                {/* Title Field */}
                                <div className='col-span-2'>
                                    <label htmlFor='title' className='block text-sm font-semibold text-gray-700 mb-2'>Event Title</label>
                                    <input type='text' id='title' name='title' defaultValue={event.title}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm'
                                    />
                                </div>

                                {/* Short Description Field */}
                                <div className='col-span-2'>
                                    <label htmlFor='shortDescription' className='block text-sm font-semibold text-gray-700 mb-2'>Short Description</label>
                                    <input type='text' id='shortDescription' name='shortDescription' defaultValue={event.shortDescription}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm'
                                    />
                                </div>

                                {/* Description Field */}
                                <div className='col-span-2'>
                                    <label htmlFor='description' className='block text-sm font-semibold text-gray-700 mb-2'>Full Description</label>
                                    <textarea id='description' name='description' defaultValue={event.description} rows="4"
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm'
                                    />
                                </div>

                                {/* Image Upload Field */}
                                <div className='col-span-2'>
                                    <label htmlFor='image' className='block text-sm font-semibold text-gray-700 mb-2'>Event Image</label>
                                    <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200'>
                                        <div className='space-y-1 text-center'>
                                            <div className='flex text-sm text-gray-600'>
                                                <label htmlFor='image' className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
                                                    <span>Upload a file</span>
                                                    <input id='image' name='image' type='file' className='sr-only' onChange={handleImageChange} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Category Field */}
                                <div>
                                    <label htmlFor='category' className='block text-sm font-semibold text-gray-700 mb-2'>Category</label>
                                    <select id='category' name='category' defaultValue={event.category}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm'
                                    >
                                        <option value=''>Select Category</option>
                                        <option value='music'>Music</option>
                                        <option value='sports'>Sports</option>
                                        <option value='food'>Food</option>
                                        <option value='art'>Art</option>
                                        <option value='technology'>Technology</option>
                                        <option value='other'>Other</option>
                                    </select>
                                </div>

                                {/* Date and Time Fields */}
                                <div>
                                    <label htmlFor='date' className='block text-sm font-semibold text-gray-700 mb-2'>Date</label>
                                    <input type='date' id='date' name='date' 
                                        defaultValue={event.date ? new Date(event.date).toISOString().split('T')[0] : ''}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='time' className='block text-sm font-semibold text-gray-700 mb-2'>Time</label>
                                    <input type='time' id='time' name='time' defaultValue={event.time}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm'
                                    />
                                </div>

                                {/* Slot Limit Field */}
                                <div>
                                    <label htmlFor='slotLimit' className='block text-sm font-semibold text-gray-700 mb-2'>Slot Limit</label>
                                    <input type='number' id='slotLimit' name='slotLimit' defaultValue={event.slotLimit}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm'
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className='col-span-2'>
                                    <button type='submit'
                                        className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:-translate-y-1 font-semibold shadow-lg'
                                    >
                                        Update Event
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditEvent