const FacilityCard = ({ facility }) => {
  const image = facility.pictures?.[0] || "/fallback.jpg"; // fallback if no image

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={facility.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/fallback.png";
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-700">{facility.name}</h3>
        <p className="text-gray-600">{facility.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Location: {facility.location} | Price: GHS {facility.price}
        </p>
      </div>
    </div>
  );
};

export default FacilityCard;