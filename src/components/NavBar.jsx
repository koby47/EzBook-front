

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">EzBook</Link>

        {/* Menu Links */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/facilities">Facilities</Link></li>

          {/* ✅ Bookings visible only if user is logged in */}
          {user && <li><Link to="/bookings">Bookings</Link></li>}

          {user ? (
            <li><button onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }} className="text-red-600">Logout</button></li>
          ) : (
            <>
              <li><Link to="/login" className="text-blue-600 font-semibold">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-blue-600 text-xl">&#9776;</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
