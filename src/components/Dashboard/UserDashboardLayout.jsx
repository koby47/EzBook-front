import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import FacilitiesTab from "./FacilitiesTab";
import BookingsTab from "./BookingsTab";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useContext } from "react";
import {AuthContext} from  "../../context/AuthContext"



const tabs = {
  profile: <UserProfile />,
  facilities: <FacilitiesTab />,
  bookings: <BookingsTab />,
};

const UserDashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("facilities");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row relative">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow z-30 sticky top-0">
        <h1 className="text-xl font-bold text-blue-600"></h1>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={26} className="text-blue-600" />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-56 bg-white z-40 shadow-lg flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center px-4 py-3  shadow-sm">
              <div className="flex items-center gap-3">
  {user?.photo ? (
    <img
      src={user.photo}
      alt="User Avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold uppercase">
      {user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
        : "EZ"}
    </div>
  )}
  <div>
    <p className="text-blue-700 font-semibold">{user?.name || "EzBook User"}</p>
    <p className="text-gray-400 text-xs">{user?.email || "user@example.com"}</p>
  </div>
</div>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={22} className="text-blue-600" />
              </button>
            </div>

            {/* Sidebar with full labels for mobile */}
            <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Narrow Sidebar */}
      {!isMobile && (
        <div className="hidden md:flex">
          <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
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
    </div>
  );
};

export default UserDashboardLayout;
