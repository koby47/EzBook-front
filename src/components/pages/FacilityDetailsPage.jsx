import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import Gallery from "../ui/Gallery";

const FacilityDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await api.getFacilityById(id);
        if (!data) throw new Error("Facility not found");
        setFacility(data);
        setError("");
      } catch (err) {
        console.error("Fetch facility error:", err.response?.data || err.message);
        setError(err.response?.data?.error || err.message || "Failed to load facility details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFacility();
    } else {
      setError("No facility ID provided in route.");
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      {/* Facility Hero Image */}
      {facility.pictures?.length > 0 && (
        <img
          src={facility.pictures[0]}
          alt={facility.name}
          className="w-full h-64 object-cover rounded-lg shadow mb-6"
        />
      )}

      {/* Facility Details Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">{facility.name}</h2>

        <div className="space-y-3 text-gray-700">
          <p><span className="font-semibold">Location:</span> {facility.location}</p>
          <p><span className="font-semibold">Price:</span> GHS {facility.price.toFixed(2)}</p>
          <p>
            <span className="font-semibold">Availability:</span>{" "}
            {facility.availability ? (
              <span className="text-green-600 font-semibold">Available</span>
            ) : (
              <span className="text-red-500 font-semibold">Unavailable</span>
            )}
          </p>
        </div>

        <p className="mt-4 text-gray-600 leading-relaxed">{facility.description}</p>
      </div>

      {/* Image Gallery */}
      {facility.pictures?.length > 1 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Gallery</h3>
          <Gallery pictures={facility.pictures.slice(1)} />
        </div>
      )}
    </div>
  );
};

export default FacilityDetailsPage;
