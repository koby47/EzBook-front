import './App.css';
import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage';
import FacilitiesPage from './components/pages/FacilitiesPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import BookingPage from './components/pages/BookingPage';
import AdminLogin from './components/pages/AdminLogin';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from "./components/routes/PrivateRoute";
import UserDashboardLayout from './components/Dashboard/UserDashboardLayout';
import EmailVerified from './components/pages/EmailVerified';
import InvalidToken from './components/pages/InvalidToken';
import ErrorVerifying from './components/pages/ErrorVerifying'

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/email-verified" element={<EmailVerified/>} />
        <Route path="/invalid-token" element={<InvalidToken/>} />
        <Route path="/error-verifying" element={<ErrorVerifying />} />
        <Route path="/dashboard" element={
         <PrivateRoute>
      <UserDashboardLayout />
    </PrivateRoute>
} />
      </Routes>
    </>
  );
}

export default App;
