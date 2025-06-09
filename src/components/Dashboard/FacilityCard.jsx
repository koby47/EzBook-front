import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../services/api";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/ddsuwfx4o/image/upload/";

const FacilityCard = ({ facility }) => {
  const imageUrl = facility.pictures?.[0]?.startsWith("http")
    ? facility.pictures[0]
    : `${CLOUDINARY_BASE_URL}${facility.pictures?.[0] || ""}`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    package: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;
    const facilityId = facility?._id || facility?.id;

    if (!userId || !facilityId) {
      toast.error("Missing user or facility ID");
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

    setLoading(true);
    try {
      await api.bookFacility(bookingData);
      toast.success("Booking successful!");
      setBookingSuccess(true);

      setTimeout(() => {
        setIsModalOpen(false);
        setBookingSuccess(false);
        setForm({ date: "", startTime: "", endTime: "", package: "" });
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <img
        src={imageUrl}
        alt={facility.name}
        className="w-full h-40 object-cover rounded-t"
        onError={(e) => {
          e.target.src = "/fallback.jpg";
          console.warn("Image failed to load:", e.target.src);
        }}
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-blue-600">{facility.name}</h3>
        <p className="text-sm text-gray-600">{facility.description}</p>
        <p className="text-sm text-gray-500">
          Type: {facility.type} | Location: {facility.location}
        </p>
        <p className="font-bold text-blue-700">GHS {facility.price}</p>
        <div className="flex justify-between mt-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          >
            Book Now
          </button>
          <button className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-100">
            View Details
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
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
                    onClick={() => setIsModalOpen(false)}
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
      )}
    </div>
  );
};

export default FacilityCard;
