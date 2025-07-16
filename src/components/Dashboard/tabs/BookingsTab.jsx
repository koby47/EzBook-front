import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // bookings per page

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const filterQuery = statusFilter ? `{"status":"${statusFilter}"}` : "{}";
      const sortQuery = '{"createdAt": -1}';

      const data = await api.getBookings(filterQuery, sortQuery, page, limit);
      setBookings(data.bookings || data); // support both paginated and plain array response
      setTotalPages(Math.ceil((data.total || data.length) / limit));
      setError("");
    } catch (err) {
      console.error("Fetch bookings error:", err.response?.data || err.message);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, statusFilter]);

  const handleStatusUpdate = async (id, status) => {
    const confirmUpdate = window.confirm(`Are you sure you want to ${status} this booking?`);
    if (!confirmUpdate) return;

    try {
      await api.updateBookingStatus(id, status);
      fetchBookings(); // refresh bookings after update
    } catch (err) {
      console.error(`Update booking status error:`, err.response?.data || err.message);
      alert(`Failed to ${status} booking.`);
    }
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // reset to first page on filter change
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Bookings Management</h2>

      {/* Filter Controls */}
      <div className="flex items-center gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-blue-600">Loading bookings...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Facility</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {booking.userId?.userName || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.userId?.email || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {booking.facilityId?.name || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.facilityId?.location || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {new Date(booking.date).toLocaleDateString()}
                    <br />
                    <span className="text-xs text-gray-500">
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "approved")}
                      disabled={booking.status === "approved"}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                        booking.status === "approved"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "cancelled")}
                      disabled={booking.status === "cancelled"}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                        booking.status === "cancelled"
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
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
            <div className="text-gray-500 text-center py-6">No bookings found.</div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
