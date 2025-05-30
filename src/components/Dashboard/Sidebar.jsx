import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getInitials } from "../../../utils/getInitials";
import { UserCircle, Building2, CalendarDays, LogOut } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-full h-full flex flex-col items-center py-4">
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-2 mb-6">
        {user?.photo ? (
          <img
            src={user.photo}
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {getInitials(user?.name)}
          </div>
        )}
        <div className="hidden lg:flex flex-col items-center text-center">
          <p className="text-sm font-semibold text-blue-700">{user?.name}</p>
          <p className="text-xs p-5 text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="space-y-7 w-full flex flex-col items-center">
        {tabs.map(({ id, label, icon: Icon }) => (
          <li
            key={id}
            onClick={() => setActiveTab(id)}
            className={`relative group w-10 h-10 flex items-center justify-center rounded-md cursor-pointer
              transition-all duration-200 ${
                activeTab === id
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-100"
              }`}
          >
            <Icon size={22} />
            <span className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {label}
            </span>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-auto mb-2 text-xs text-red-500 hover:underline"
      >
        <LogOut size={16} className="inline mr-1" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
