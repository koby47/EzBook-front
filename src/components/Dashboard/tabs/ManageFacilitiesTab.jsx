import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import AddFacilityForm from "../../AddFacilityForm";
import EditFacilityForm from "../../EditFacilityForm";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ManageFacilitiesTab = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [error, setError] = useState("");

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const res = await api.getFacilities();
      const data = (res.facilities || res).map((fac, index) => ({
        ...fac,
        _id: fac._id || fac.id || `fallback-${index}`,
      }));
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

  const handleDelete = async (facilityId) => {
    if (!facilityId) {
      console.error("Delete error: Missing facility ID");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this facility?")) return;
    try {
      await api.deleteFacility(facilityId);
      fetchFacilities();
    } catch (err) {
      console.error("Delete facility error:", err.response?.data || err.message);
      alert("Failed to delete facility.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Header onAdd={() => setShowAddModal(true)} />

      {loading && <LoadingSkeleton />}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && facilities.length === 0 && (
        <EmptyState message="No facilities added yet." />
      )}

      {!loading && facilities.length > 0 && (
        <FacilityGrid
          facilities={facilities}
          onEdit={setEditingFacility}
          onDelete={handleDelete}
        />
      )}

      {showAddModal && (
        <AddFacilityForm
          onClose={() => setShowAddModal(false)}
          onFacilityAdded={fetchFacilities}
        />
      )}

      {editingFacility && (
        <EditFacilityForm
          facility={editingFacility}
          onClose={() => setEditingFacility(null)}
          onFacilityUpdated={fetchFacilities}
        />
      )}
    </div>
  );
};

const Header = ({ onAdd }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Manage Facilities</h2>
    <button
      onClick={onAdd}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition"
    >
      <PlusIcon className="w-5 h-5" />
      Add Facility
    </button>
  </div>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(6)].map((_, idx) => (
      <div key={idx} className="animate-pulse bg-white h-60 rounded shadow" />
    ))}
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-20 text-gray-500">{message}</div>
);

const FacilityGrid = ({ facilities, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {facilities.map((facility) => (
      <FacilityCard
        key={facility._id}
        facility={facility}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);

const FacilityCard = ({ facility, onEdit, onDelete }) => (
  <div className="bg-white rounded shadow hover:shadow-lg transition duration-200 overflow-hidden relative">
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

    <div className="absolute top-2 right-2 flex gap-2">
      <button
        onClick={() => onEdit(facility)}
        className="bg-blue-500 hover:bg-blue-600 p-1 rounded"
      >
        <PencilIcon className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={() => onDelete(facility._id)}
        className="bg-red-500 hover:bg-red-600 p-1 rounded"
      >
        <TrashIcon className="w-4 h-4 text-white" />
      </button>
    </div>
  </div>
);

export default ManageFacilitiesTab;
