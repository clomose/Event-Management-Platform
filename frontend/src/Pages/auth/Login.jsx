import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'
import { useState} from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async  (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/v1/user/login', {
            email,
            password
        }, {withCredentials : true})
        if(response.status === 200){
            console.log(response.data);
            navigate('/');
        }else{
            alert('Login failed');
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-100'>
      <div className='bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl w-full max-w-md mx-4 transform transition duration-300 hover:shadow-2xl'>
        {/* Header Section */}
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-bold text-gray-800 mb-3'>Login</h1>
          <p className='text-gray-600 text-lg'>Login to your account</p>
        </div>
        
        {/* Login Form */}
        <form className='space-y-7' onSubmit={handleSubmit}>
          <div className='space-y-5'>
            {/* Email Input */}
            <div className='relative'>
              <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input 
                placeholder='Email Address' 
                type='email' 
                id='email'
                name='email' 
                className='border-2 border-gray-200 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300 bg-white/50'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Input */}
            <div className='relative'>
              <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input 
                placeholder='Password' 
                type='password' 
                id='password'
                name='password' 
                className='border-2 border-gray-200 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300 bg-white/50'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type='submit' 
            className='bg-indigo-600 text-white rounded-xl p-4 w-full font-semibold transform transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-indigo-500/30 hover:cursor-pointer'
          >
            Login
          </button>

          {/* Register Link */}
          <div className='text-center'>
            <p className='text-gray-600 text-lg'>
              Don't have an account?{' '}
              <Link to='/register' className='text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300'>
                Register
              </Link>
            </p>
          </div>
        </form>

        {/* Guest Access */}
        <div className='mt-6'>
          <button 
            className='w-full text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300 hover:cursor-pointer flex items-center justify-center gap-2 bg-indigo-100 p-4 rounded-xl hover:bg-indigo-200'
          >
            <User className='w-5 h-5 mr-2' />
            Continue as a guest
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login