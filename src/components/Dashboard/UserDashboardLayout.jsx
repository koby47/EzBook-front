import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import FacilitiesTab from "./FacilitiesTab";
import BookingsTab from "./BookingsTab";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const getInitials = (name) =>
  name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "EZ";

const tabs = {
  profile: <UserProfile />,
  facilities: <FacilitiesTab />,
  bookings: <BookingsTab />,
};

const UserDashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("facilities");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row relative">
      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-white z-40 shadow-lg flex flex-col"
          >
            {/* Drawer Header with Avatar */}
            <div className="flex items-center justify-between px-4 py-3 border-b shadow-sm">
              <div className="flex items-center gap-3">
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {getInitials(user?.name)}
                  </div>
                )}
                <div>
                  <p className="text-blue-700 font-semibold">
                    {user?.name || "EzBook User"}
                  </p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={22} className="text-blue-600" />
              </button>
            </div>

            {/* Sidebar Tabs */}
            <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

            {/* Optional Bottom Close Button */}
            <div className="mt-auto p-4 md:hidden">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-full bg-gray-100 text-blue-600 py-2 rounded hover:bg-gray-200"
              >
                Close Menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:flex">
          <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {tabs[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ✅ Floating Menu Button (Mobile only) */}
      {!sidebarOpen && isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-200 md:hidden"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default UserDashboardLayout;
