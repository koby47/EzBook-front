import { useState } from "react";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import FacilitiesTab from "./FacilitiesTab";
import BookingsTab from "./BookingsTab";
import { motion, AnimatePresence } from "framer-motion";

const tabs = {
  profile: <UserProfile />,
  facilities: <FacilitiesTab />,
  bookings: <BookingsTab />,
};

const UserDashboardLayout = () => {
  const [activeTab, setActiveTab] = useState("facilities");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-6">
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
