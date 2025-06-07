import { useEffect, useState, useContext } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import EditBookingModal from "../Modals/EditBookingModal";

const BookingsTab = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getMyBookings();
      setBookings(data.bookings || []);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
  console.log("Cancelling booking with ID:", id); 
  try {
    await api.userUpdateBooking(id, { status: "cancelled" });
    toast.success("Booking cancelled");
    fetchBookings();
  } catch (err) {
    console.error("Cancel error:", err); // 
    toast.error("Cancellation failed");
  }
};


  const openEdit = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleSaveEdit = async (formData) => {
    const { bookingId, ...payload } = formData;

    if (!bookingId) {
      toast.error("Missing booking ID");
      return;
    }

    try {
      await api.userUpdateBooking(bookingId, payload);
      toast.success("Booking updated");
      setShowModal(false);
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-700">Your Bookings</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id || booking.id}
              className="bg-white shadow rounded p-4 space-y-2 border border-blue-100"
            >
              <h4 className="text-blue-700 font-semibold">
                {booking.facilityId?.name || "Facility"}
              </h4>
              <p className="text-sm text-gray-600">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Time: {booking.startTime} - {booking.endTime || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Package: {booking.package || "None"}
              </p>
              <p className="text-sm text-gray-500">
                Status: <strong>{booking.status}</strong>
              </p>

              {booking.status === "pending" && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => openEdit(booking)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancel(booking._id ||booking.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for editing a booking */}
      <EditBookingModal
        isOpen={showModal}
        booking={selectedBooking}
        onClose={() => setShowModal(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default BookingsTab;
