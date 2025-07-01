import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import AddFacilityForm from "../../AddFacilityForm";


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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Facilities</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Add Facility
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading facilities...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {facilities.length === 0 && !loading ? (
        <div className="text-center mt-10 text-gray-500">
          No facilities added yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="border rounded shadow hover:shadow-lg transition duration-200 bg-white"
            >
              {facility.pictures?.[0] && (
                <img
                  src={facility.pictures[0]}
                  alt={facility.name}
                  className="w-full h-40 object-cover rounded-t"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{facility.name}</h3>
                <p className="text-gray-600 mb-2">{facility.location}</p>
                <p className="text-gray-800 mb-2">
                  GHS {facility.price.toFixed(2)}
                </p>
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

export default ManageFacilitiesTab;