const tabs = [
  { id: "profile", label: "User Profile", icon: "👤" },
  { id: "facilities", label: "Facilities", icon: "🏢" },
  { id: "bookings", label: "Bookings", icon: "📅" },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-60 bg-white  p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-blue-600"></h2>
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-all
              ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
