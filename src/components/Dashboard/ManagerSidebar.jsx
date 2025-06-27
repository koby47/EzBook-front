
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Layers, CalendarCheck, Bell, User, LogOut } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const ManagerSidebar = ({ activeTab, setActiveTab, isMobile, setSidebarOpen }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const tabs = [
    { key: "overview", label: "Overview", icon: <Home size={18} /> },
    { key: "manage", label: "Manage Facilities", icon: <Layers size={18} /> },
    { key: "bookings", label: "Bookings", icon: <CalendarCheck size={18} /> },
    { key: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { key: "profile", label: "Profile", icon: <User size={18} /> },
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    if (isMobile) setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r shadow-sm flex flex-col min-h-screen">
      <div className="flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`w-full flex items-center gap-3 px-6 py-3 ${
              activeTab === tab.key
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="border-t px-6 py-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default ManagerSidebar;
