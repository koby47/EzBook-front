
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";

const BookingModal = ({ isOpen, onClose, facility }) => {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    package: "",
  });
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;
    const facilityId = facility?._id || facility?.id;

    if (!userId || !facilityId) {
      toast.error("Please log in to book this facility.");
      return;
    }

    if (!form.date || !form.startTime) {
      toast.error("Please select both date and start time.");
      return;
    }

    const bookingData = {
      userId,
      facilityId,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime || "",
      package: form.package || "",
    };

    try {
      setLoading(true);
      await api.bookFacility(bookingData);
      toast.success("Booking successful!");
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setForm({ date: "", startTime: "", endTime: "", package: "" });
        onClose();
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-lg relative">
        {bookingSuccess ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-green-600">🎉 Booking Confirmed!</h3>
            <p className="text-gray-600">
              Your booking for <strong>{facility.name}</strong> has been submitted.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Book {facility.name}
            </h3>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="package"
              placeholder="Optional package"
              value={form.package}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={onClose}
                className="w-full py-2 rounded border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
