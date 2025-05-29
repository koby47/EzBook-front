import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import FacilityCard from "../Dashboard/FacilityCard";
import FilterBar from "../Dashboard/FilterBar";
import { motion } from "framer-motion";

const dummyFacilities = [
  {
    _id: "1",
    name: "Sunset Hotel",
    type: "hotel",
    location: "Accra",
    price: 250,
    pictures: ["/fallback.jpg"],
  },
  {
    _id: "2",
    name: "Lakeside Conference Hall",
    type: "conference",
    location: "Kumasi",
    price: 800,
    pictures: ["/fallback.jpg"],
  },
];

const UserDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const data = await api.getFacilities();
        const fetched = Array.isArray(data) ? data : data?.facilities || [];

        const sorted = [...fetched].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const result = sorted.length ? sorted : dummyFacilities;

        setFacilities(result);
        setFiltered(result);
      } catch (err) {
        console.error("❌ Fetch facilities error:", err.message);
        setFacilities(dummyFacilities);
        setFiltered(dummyFacilities);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    let results = facilities;

    if (search) {
      results = results.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (typeFilter) {
      results = results.filter((f) => f.type === typeFilter);
    }

    if (priceFilter) {
      results = results.filter((f) => {
        const price = f.price;
        if (priceFilter === "lt500") return price < 500;
        if (priceFilter === "500to1000") return price >= 500 && price <= 1000;
        if (priceFilter === "gt1000") return price > 1000;
        return true;
      });
    }

    setFiltered(results);
  }, [search, typeFilter, priceFilter, facilities]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Available Facilities</h2>

      <FilterBar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />

      {loading ? (
        <div className="text-center text-gray-500 mt-10 animate-pulse">
          Loading facilities...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No matching facilities found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {filtered.map((facility) => (
            <motion.div
              key={facility._id || facility.id}
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
