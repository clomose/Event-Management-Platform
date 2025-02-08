import React from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'

const Register = () => {
  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-100'>
      <div className='bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl w-full max-w-md mx-4 transform transition duration-300 hover:shadow-2xl'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-bold text-gray-800 mb-3'>Welcome</h1>
          <p className='text-gray-600 text-lg'>Create your account</p>
        </div>
        
        <form className='space-y-7'>
          <div className='space-y-5'>
            <div className='relative'>
              <User className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input 
                placeholder='Full Name' 
                type='text' 
                id='name' 
                className='border-2 border-gray-200 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300 bg-white/50'
              />
            </div>
            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input 
                placeholder='Email Address' 
                type='email' 
                id='email' 
                className='border-2 border-gray-200 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300 bg-white/50'
              />
            </div>
            <div className='relative'>
              <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input 
                placeholder='Password' 
                type='password' 
                id='password' 
                className='border-2 border-gray-200 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300 bg-white/50'
              />
            </div>
          </div>

          <button 
            type='submit' 
            className='bg-indigo-600 text-white rounded-xl p-4 w-full font-semibold transform transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-indigo-500/30'
          >
            Create Account
          </button>

          <div className='text-center pt-2'>
            <p className='text-gray-600 text-lg'>
              Already have an account?{' '}
              <Link to='/login' className='text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register