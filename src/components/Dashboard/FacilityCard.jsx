const FacilityCard = ({ facility }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img
        src={facility.pictures?.[0]}
        alt={facility.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{facility.name}</h3>
        <p className="text-gray-500 text-sm">{facility.location}</p>
        <p className="text-gray-600">{facility.type}</p>
        <p className="text-blue-700 font-bold">${facility.price}</p>
        <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;