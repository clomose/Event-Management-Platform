import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Outlet , useNavigate} from 'react-router-dom'
import axios from 'axios';

export const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = async () => {
      console.log("Logging out")
      const response = await axios.get("${import.meta.env.VITE_SERVER_URL}/api/v1/user/logout");
      console.log("logout",response);
      if(response.status === 200){
          navigate("/login");
      }
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await axios.get("${import.meta.env.VITE_SERVER_URL}/api/v1/user/current-user", {withCredentials: true});
      if(response.status === 200){
        setIsLoggedIn(true);
      }
    }
    checkLoggedIn();
  })

    
  return (
    <>
    <nav className='w-full h-20 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg'>
      <div className='container mx-auto h-full flex items-center justify-between px-6'>
        <div className='flex items-center'>
          <Link to="/" className='text-3xl font-extrabold text-white tracking-tight hover:text-indigo-100 transition-all duration-300'>
            Events<span className='text-purple-200'>On</span>
          </Link>
        </div>
        
        <div className='flex items-center space-x-8'>
          <Link to="/" className='text-white hover:text-purple-200 transition-all duration-300 font-medium text-lg'>Home</Link>
          <Link to="/events" className='text-white hover:text-purple-200 transition-all duration-300 font-medium text-lg'>Events</Link>
          {isLoggedIn ? <Link to="/dashboard" className='text-white hover:text-purple-200 transition-all duration-300 font-medium text-lg'>Dashboard</Link> : null}
        </div>

        <div className='flex items-center'>
          <div
            to="/events/create" 
            className='bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold 
              hover:bg-purple-100 hover:transform hover:scale-105 
              transition-all duration-300 shadow-md'
          >
            {isLoggedIn ? (<div className='flex items-center space-x-2'>
              <button className='' onClick={handleLogout}>LogOut</button>
            </div>) : <Link to="/login">Login</Link>}
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  )
}

export default Navbar;
