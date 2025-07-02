import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import AddFacilityForm from "../../AddFacilityForm";
import { PlusIcon } from "@heroicons/react/24/outline";

const ManageFacilitiesTab = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState("");

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const data = await api.getFacilities();
      setFacilities(data);
      setError("");
    } catch (err) {
      console.error("Fetch facilities error:", err.response?.data || err.message);
      setError("Failed to load facilities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Facilities</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
        >
          <PlusIcon className="w-5 h-5" />
          Add Facility
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="animate-pulse bg-white h-60 rounded shadow" />
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && facilities.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No facilities added yet.
        </div>
      )}

      {!loading && facilities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddFacilityForm
          onClose={() => setShowAddModal(false)}
          onFacilityAdded={fetchFacilities}
        />
      )}
    </div>
  );
};

const FacilityCard = ({ facility }) => (
  <div className="bg-white rounded shadow hover:shadow-lg transition duration-200 overflow-hidden">
    {facility.pictures?.[0] ? (
      <img
        src={facility.pictures[0]}
        alt={facility.name}
        className="w-full h-40 object-cover"
      />
    ) : (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
        No Image
      </div>
    )}
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-1">{facility.name}</h3>
      <p className="text-gray-600 mb-1">{facility.location}</p>
      <p className="text-gray-800 mb-2">GHS {facility.price.toFixed(2)}</p>
      <span
        className={`inline-block px-2 py-1 text-xs rounded-full ${
          facility.availability
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {facility.availability ? "Available" : "Unavailable"}
      </span>
    </div>
  </div>
);

export default ManageFacilitiesTab;
