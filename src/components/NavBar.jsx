

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">EzBook</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/facilities">Facilities</Link></li>
          {user && <li><Link to="/bookings">Bookings</Link></li>}
          {user ? (
            <li>
              <button onClick={handleLogout} className="text-red-600">Logout</button>
            </li>
          ) : (
            <>
              <li><Link to="/login" className="text-blue-600 font-semibold">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-600 text-2xl"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 ">
          <ul className="flex flex-col gap-4 text-gray-700">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/facilities" onClick={() => setMenuOpen(false)}>Facilities</Link></li>
            {user && <li><Link to="/bookings" onClick={() => setMenuOpen(false)}>Bookings</Link></li>}
            {user ? (
              <li>
                <button onClick={handleLogout} className="text-red-600">Logout</button>
              </li>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setMenuOpen(false)} className="text-blue-600 font-semibold">Login</Link></li>
                <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

