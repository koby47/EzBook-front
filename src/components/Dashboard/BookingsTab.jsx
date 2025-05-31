import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { motion } from "framer-motion";

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.getMyBookings();
        setBookings(res.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-700 mb-4">My Bookings</h2>

      {loading ? (
        <div className="text-gray-500">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-gray-500">No bookings found.</div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b, index) => (
            <motion.div
              key={b._id}
              className="bg-white p-4 rounded shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <p><strong>Facility:</strong> {b.facilityId?.name}</p>
              <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {b.startTime} – {b.endTime || "N/A"}</p>
              <p><strong>Status:</strong> <span className="text-blue-600">{b.status}</span></p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsTab;
