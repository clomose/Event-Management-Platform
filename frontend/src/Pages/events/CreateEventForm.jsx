import React from 'react'

const CreateEventForm = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <div className='w-full max-w-md p-6 bg-white rounded-xl shadow-md'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-bold text-gray-800 mb-3'>Create New Event</h1>
                <p className='text-gray-600 mb-6'>Fill in the details below to create a new event</p>
            </div>
            <form className='flex flex-col items-center justify-center'>
                <div className='w-full mb-4'>
                    <label htmlFor='title' className='block text-gray-600 font-medium mb-2'>Event Title</label>
                    <input type='text' id='title' name='title' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='description' className='block text-gray-600 font-medium mb-2'>Event Description</label>
                    <textarea id='description' name='description' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' />
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='category' className='block text-gray-600 font-medium mb-2'>Event Category</label>
                    <select id='category' name='category' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300'>
                        <option value=''>Select Category</option>
                        <option value=''>Category 1</option>
                        <option value=''>Category 2</option>
                        <option value=''>Category 3</option>
                    </select>
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor='date' className='block text-gray-600 font-medium mb-2'>Event Date</label>
                    <input type='date' id='date' name='date' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300' />
                </div>
                <div className='w-full mb-4'>
                    <button type='submit' className='w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all duration-300'>Create Event</button>
                    
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateEventForm