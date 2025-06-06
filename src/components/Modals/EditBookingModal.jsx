// components/Modals/EditBookingModal.jsx
import { useState, useEffect } from "react";

const EditBookingModal = ({ isOpen, onClose, booking, onSave }) => {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    package: "",
  });

  // Populate form when a booking is passed
  useEffect(() => {
    if (booking) {
      setForm({
        date: booking.date?.slice(0, 10) || "",
        startTime: booking.startTime || "",
        endTime: booking.endTime || "",
        package: booking.package || "",
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.date || !form.startTime) {
      alert("Date and start time are required");
      return;
    }

    // Pass both form and booking._id
    onSave({
      ...form,
      bookingId: booking.id,
    });
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded shadow-lg p-6 space-y-4 relative">
        <h2 className="text-lg font-bold text-blue-700">Edit Booking</h2>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
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
          value={form.package}
          onChange={handleChange}
          placeholder="Package (optional)"
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
