import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import Register from './Pages/auth/Register'
import Login from './Pages/auth/Login'
import CreateEventForm from './Pages/events/CreateEventForm'
import HeroSection from './Pages/events/HeroSection'
import { Navbar } from './components/Navbar'
import EventCard from './Pages/events/EventCard'
import EventPage from './Pages/events/EventPage'
import EventFilters from './Pages/events/EventFilters'
import MainPage from './Pages/events/MainPage'
import EventDashboard from './Pages/dashboard/EventDashboard'
import MyEvent from './Pages/dashboard/MyEvent'
import RegisteredEvents from './Pages/dashboard/RegisteredEvents'
import EditEvent from './Pages/dashboard/EditEvent'
import Home from './Pages/home/home'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} >
        <Route index element={<Home />} />
        <Route path="/events" element={<MainPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/events/create" element={<CreateEventForm />} />
        <Route path="/dashboard" element={<EventDashboard />} >
          <Route index element={<MyEvent />} />
          <Route path="/dashboard/registered-events" element={<RegisteredEvents />} />
        </Route>
        <Route path="/events/edit/:id" element={<EditEvent />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
