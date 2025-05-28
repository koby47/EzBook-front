import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import FacilityCard from "../Dashboard/FacilityCard";
import FilterBar from "../Dashboard/FilterBar";
import { motion } from "framer-motion";

// Fallback data
const dummyFacilities = [
  {
    _id: "1",
    name: "Golden Palace Hotel",
    description: "Elegant hotel with modern amenities.",
    type: "hotel",
    location: "Accra",
    price: 300,
    pictures: ["https://via.placeholder.com/300x200"],
  },
  {
    _id: "2",
    name: "Classic Event Hall",
    description: "Perfect for weddings and parties.",
    type: "hall",
    location: "Kumasi",
    price: 800,
    pictures: ["https://via.placeholder.com/300x200"],
  },
  {
    _id: "3",
    name: "Ocean View Conference Room",
    description: "Spacious and tech-equipped for meetings.",
    type: "conference room",
    location: "Cape Coast",
    price: 500,
    pictures: ["https://via.placeholder.com/300x200"],
  },
];

const UserDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const data = await api.getFacilities();
        const result = data.length ? data : dummyFacilities;
        setFacilities(result);
        setFiltered(result);
      } catch (err) {
        console.error("❌ Fetch facilities error:", err);
        setFacilities(dummyFacilities);
        setFiltered(dummyFacilities);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    const searchFiltered = facilities.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(searchFiltered);
  }, [search, facilities]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Available Facilities</h2>

      <FilterBar search={search} setSearch={setSearch} />

      {loading ? (
        <div className="text-center text-gray-500 mt-10 animate-pulse">Loading facilities...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No matching facilities found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {filtered.map((facility) => (
            <motion.div
              key={facility._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FacilityCard facility={facility} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;