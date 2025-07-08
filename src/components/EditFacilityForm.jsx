import React, { useState } from "react";
import { api } from "../../services/api";

const EditFacilityForm = ({ facility, onClose, onFacilityUpdated }) => {
  const [formData, setFormData] = useState({
    name: facility.name || "",
    description: facility.description || "",
    type: facility.type || "",
    location: facility.location || "",
    price: facility.price || "",
    availability: facility.availability || false,
    pictures: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      pictures: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.updateFacility(facility._id, formData);
      onFacilityUpdated(); // Refresh facilities list
      onClose();
    } catch (err) {
      console.error("Update facility error:", err.response?.data || err.message);
      setError("Failed to update facility.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Facility</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select type</option>
              <option value="hotel">Hotel</option>
              <option value="conference room">Conference Room</option>
              <option value="party venue">Party Venue</option>
              <option value="hall">Hall</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (GHS)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="mr-2"
              />
              Available
            </label>
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Pictures</label>
            <input
              type="file"
              name="pictures"
              multiple
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFacilityForm;
