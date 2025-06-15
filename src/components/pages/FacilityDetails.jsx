import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Spinner from "../Spinner";
import { useAuth } from "../../context/AuthContext";
import BookingModal from "../ui/BookingModal";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/ddsuwfx4o/image/upload/";

const FacilityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await api.getFacilityById(id);
        setFacility(data);
        const firstImage = data.pictures?.[0];
        setActiveImage(firstImage?.startsWith("http") ? firstImage : `${CLOUDINARY_BASE_URL}${firstImage}`);
      } catch (err) {
        console.error("Error loading facility:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacility();
  }, [id]);

  if (loading) return <Spinner />;
  if (!facility) return <div className="p-4 text-red-600">Facility not found</div>;

  const images = facility.pictures?.map(pic =>
    pic.startsWith("http") ? pic : `${CLOUDINARY_BASE_URL}${pic}`
  );

  const handleBookNow = () => {
    if (!user) {
      navigate("/login");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="mt-6 md:mt-10 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 bg-white shadow-lg rounded-lg p-6">
      {/* Left column: Image gallery */}
      <div className="md:col-span-5 flex gap-4">
        <div className="flex flex-col gap-2">
          {images?.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setActiveImage(url)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                activeImage === url ? "border-blue-600 shadow-md" : "border-gray-300"
              } hover:scale-105`}
            />
          ))}
        </div>

        <div className="flex-1">
          <img
            src={activeImage}
            alt="Main Facility View"
            className="w-full h-[350px] object-cover rounded-md shadow-xl"
          />
        </div>
      </div>

      {/* Right column: Facility details */}
      <div className="md:col-span-7 space-y-4">
        <h1 className="text-3xl font-bold text-blue-800">{facility.name}</h1>
        <p className="text-2xl text-green-700 font-semibold">GHS {facility.price}</p>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold text-gray-600">Location:</span> {facility.location}</p>
          <p><span className="font-semibold text-gray-600">Type:</span> {facility.type}</p>
          <p>
            <span className="font-semibold text-gray-600">Availability:</span>{" "}
            {facility.availability ? (
              <span className="text-green-600 font-semibold">Available</span>
            ) : (
              <span className="text-red-500 font-semibold">Not Available</span>
            )}
          </p>
        </div>

        <p className="mt-4 leading-relaxed text-gray-600">{facility.description}</p>

        <button
          onClick={handleBookNow}
          disabled={!facility.availability}
          className={`mt-6 px-6 py-3 w-full md:w-auto rounded-lg font-semibold shadow transition-all duration-300 ${
            facility.availability
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Book Now
        </button>

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          facility={facility}
        />
      </div>
    </div>
  );
};

export default FacilityDetails;
