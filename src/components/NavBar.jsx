import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState, useContext } from "react";


const Navbar = () => {
 const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
  logout();         // calls context logout()
  setMenuOpen(false);
  navigate("/login");
};

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EzBook
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 items-center">
          <li><Link to="/">Home</Link></li>
      

          {user ? (
            <>
              {user.role === "manager" && (
                <Link to="/manager-dashboard">Dashboard</Link>

              )}
              {user.role === "user" && (
                <li><Link to="/dashboard">Dashboard</Link></li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="text-blue-600 font-semibold">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>

        {/* Mobile hamburger icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-600 text-2xl"
            aria-label="Toggle Menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4">
          <ul className="flex flex-col gap-4 text-gray-700">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
      

            {user ? (
              <>
                {user.role === "manager" && (
                <Link to="/manager-dashboard">Dashboard</Link>

              )}
                {user.role === "user" && (
                  <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
