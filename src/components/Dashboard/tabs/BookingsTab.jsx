import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await api.getBookings();
        setBookings(data);
      } catch (err) {
        console.error("Fetch bookings error:", err.response?.data || err.message);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const confirmUpdate = window.confirm(`Are you sure you want to ${status} this booking?`);
    if (!confirmUpdate) return;

    try {
      await api.updateBookingStatus(id, status);
      // Refresh bookings after update
      const updated = bookings.map(b => 
        b._id === id ? { ...b, status } : b
      );
      setBookings(updated);
    } catch (err) {
      console.error(`Update booking status error:`, err.response?.data || err.message);
      alert(`Failed to ${status} booking.`);
    }
  };

  if (loading) return <div className="p-6">Loading bookings...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Facility</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="py-2 px-4 border-b">{booking.userId?.userName || "N/A"}</td>
              <td className="py-2 px-4 border-b">{booking.facilityId?.name || "N/A"}</td>
              <td className="py-2 px-4 border-b">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : booking.status === "cancelled"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  onClick={() => handleStatusUpdate(booking._id, "approved")}
                  disabled={booking.status === "approved"}
                  className={`px-3 py-1 rounded ${
                    booking.status === "approved"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(booking._id, "cancelled")}
                  disabled={booking.status === "cancelled"}
                  className={`px-3 py-1 rounded ${
                    booking.status === "cancelled"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bookings.length === 0 && (
        <div className="text-gray-500 text-center py-4">No bookings found.</div>
      )}
    </div>
  );
};

export default BookingsTab;
