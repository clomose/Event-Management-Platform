import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/auth/Login'
import CreateEventForm from './Pages/events/CreateEventForm'
import HeroSection from './Pages/events/HeroSection'
import { Navbar } from './components/Navbar'
import EventCard from './Pages/events/EventCard'
import EventPage from './Pages/events/EventPage'
import EventFilters from './Pages/events/EventFilters'
import MainPage from './Pages/events/MainPage'
function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events/create" element={<CreateEventForm />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/events" element={<HeroSection />} />
        <Route path="/events/card" element={<EventCard />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/events/filters" element={<EventFilters />} />
        <Route path="/events/main" element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
