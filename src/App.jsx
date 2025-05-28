import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Link } from "react-router-dom"
import HomePage from './components/pages/HomePage';
import FacilitiesPage from './components/pages/FacilitiesPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import BookingPage from './components/pages/BookingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from "./components/pages/AdminLogin";
import UserDashboard from './components/Dashboard/UserDashboard';


function App() {
  

  return (
    <>
    <NavBar/>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/admin-login" element={<AdminLogin />} />
         <Route path='/dashboard' element={<UserDashboard/>} />
      </Routes>

    </>
  )
}

export default App
