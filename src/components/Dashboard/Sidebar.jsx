import { li } from "framer-motion/client";
import { UserCircle,Building2,CalendarDays } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon:UserCircle },
  { id: "facilities", label: "Facilities", icon: Building2},
  { id: "bookings", label: "Bookings", icon: CalendarDays },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-full bg-white shadow-md flex flex-col items-center py-6 w-16 md:w-20 lg:w-16 relative" >
      <ul className="space-y-6 w-full flex flex-col items-center">
        {tabs.map((tab) =>{
          const Icon = tab.icon;
          const isActive = activeTab ===tab.id;
          return(
            <li 
            key={tab.id}
            onClick={()=> setActiveTab(tab.id)}
            className={`relative group w-10 h-10 flex items-center justify transition-all duration-200
            ${isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-blue-100"}`}>
              <Icon size={22}/>
              {/* Tootip on hover (desktop only) */}
             <span className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"  >
             {tab.label}

             </span>

            </li>

          );
        })}
      </ul>
      
    </div>
  );
};

export default Sidebar;
