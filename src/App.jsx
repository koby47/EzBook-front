import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import PrivateRoute from './components/routes/PrivateRoute';
import Spinner from './components/Spinner';

// Lazy-loaded pages
const HomePage = lazy(() => import('./components/pages/HomePage'));
const FacilitiesPage = lazy(() => import('./components/pages/FacilitiesPage'));
const LoginPage = lazy(() => import('./components/pages/LoginPage'));
const RegisterPage = lazy(() => import('./components/pages/RegisterPage'));
const BookingPage = lazy(() => import('./components/pages/BookingPage'));
const AdminLogin = lazy(() => import('./components/pages/AdminLogin'));
const EmailVerified = lazy(() => import('./components/pages/EmailVerified'));
const InvalidToken = lazy(() => import('./components/pages/InvalidToken'));
const ErrorVerifying = lazy(() => import('./components/pages/ErrorVerifying'));
const UserDashboardLayout = lazy(() => import('./components/Dashboard/UserDashboardLayout'));

function App() {
  return (
    <>
      <NavBar />

      <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Spinner /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/invalid-token" element={<InvalidToken />} />
          <Route path="/error-verifying" element={<ErrorVerifying />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboardLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
