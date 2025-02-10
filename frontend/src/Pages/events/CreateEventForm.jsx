import React from 'react'
import { useState } from 'react';
import axios from 'axios';  

const CreateEventForm = () => {
    const [image, setImage] = useState(null);

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
        formData.append("image", image);
        axios.post('http://localhost:8000/api/v1/event/create', formData, {
            headers : {
                "Content-Type" : "multipart/form-data",
            },
            withCredentials : true
        })
        .then(response => {
            console.log(response);
        })  
        .catch(error => {
            console.error('Error creating event:', error);
        })
    }
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <div className='w-full max-w-md p-6 bg-white rounded-xl shadow-md'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold text-gray-800 mb-3'>Create New Event</h1>
                <p className='text-gray-600 mb-6'>Fill in the details below to create a new event</p>
            </div>
            <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                <div className='w-full mb-4'>
                    <label htmlFor='title' className='block text-gray-600 font-medium mb-2'>Event Title</label>
                    <input type='text' id='title' name='title' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='shortDescription' className='block text-gray-600 font-medium mb-2'>Event Short Description</label>
                    <input type='text' id='shortDescription' name='shortDescription' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='description' className='block text-gray-600 font-medium mb-2'>Event Description</label>
                    <textarea id='description' name='description' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='image' className='block text-gray-600 font-medium mb-2'>Event Image</label>
                    <input type='file' id='image' name='image' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' onChange={handleImageChange} />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='category' className='block text-gray-600 font-medium mb-2'>Event Category</label>
                    <select id='category' name='category' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300'>
                        <option name='category' value=''>Select Category</option>
                        <option name='category' value='music'>Music</option>
                        <option name='category' value='sports'>Sports</option>
                        <option name='category' value='food'>Food</option>
                        <option name='category' value='art'>Art</option>
                        <option name='category' value='technology'>Technology</option>
                        <option name='category' value='other'>Other</option>
                    </select>
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='date' className='block text-gray-600 font-medium mb-2'>Event Date</label>
                    <input type='date' id='date' name='date' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='time' className='block text-gray-600 font-medium mb-2'>Event Time</label>
                    <input type='time' id='time' name='time' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' />
                </div>
                <div className='w-full mb-4'>
                    <button type='submit' className='w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all duration-300' >Create Event</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEventForm