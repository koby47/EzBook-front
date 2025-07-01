import React, { useState } from "react";
import { api } from "../../services/api";

const AddFacilityForm = ({ onClose, onFacilityAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    location: "",
    price: "",
    availability: true,
    pictures: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        pictures: Array.from(files),
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.createFacility(formData);
      onFacilityAdded(); // Refresh facility list in parent
      onClose(); // Close modal
    } catch (err) {
      console.error("Add facility error:", err.response?.data || err.message);
      setError("Failed to add facility. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add New Facility
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Facility Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter facility name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the facility"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="hotel">Hotel</option>
              <option value="conference room">Conference Room</option>
              <option value="party venue">Party Venue</option>
              <option value="hall">Hall</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (GHS)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Set price"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium">Available</label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pictures</label>
            <input
              type="file"
              name="pictures"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-700"
            />
            {formData.pictures.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {formData.pictures.map((pic, index) => (
                  <div
                    key={index}
                    className="border rounded overflow-hidden h-24 flex items-center justify-center"
                  >
                    <img
                      src={URL.createObjectURL(pic)}
                      alt={`preview ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Facility"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFacilityForm;