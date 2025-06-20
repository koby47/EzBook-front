// FacilityManagerDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import ManagerSidebar from "./ManagerSidebar";
import OverviewTab from "./tabs/OverviewTab";
import ManageFacilitiesTab from "./tabs/ManageFacilitiesTab";
import BookingsTab from "./tabs/BookingsTab";
import NotificationsTab from "./tabs/NotificationsTab";
import ManagerProfile from "./tabs/ManagerProfile";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const getInitials = (name) =>
  name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "EZ";

const tabs = {
  overview: <OverviewTab />,
  manage: <ManageFacilitiesTab />,
  bookings: <BookingsTab />,
  notifications: <NotificationsTab />,
  profile: <ManagerProfile />,
};

const FacilityManagerDashboard = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user || { name: "Manager", email: "" };
  const [activeTab, setActiveTab] = useState("overview");
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
            <div className="flex items-center justify-between px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Manager Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {getInitials(user?.name)}
                  </div>
                )}
                <div>
                  <p className="text-blue-700 font-semibold">
                    {user?.name || "Manager"}
                  </p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={22} className="text-blue-600" />
              </button>
            </div>

            <ManagerSidebar
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              isMobile={isMobile}
              setSidebarOpen={setSidebarOpen}
            />

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
          <ManagerSidebar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            isMobile={isMobile}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      )}

      {/* Main Dashboard Content */}
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

      {/* Floating Menu Button (mobile only) */}
      <AnimatePresence>
        {!sidebarOpen && isMobile && (
          <motion.button
            key="float-menu"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FacilityManagerDashboard;
