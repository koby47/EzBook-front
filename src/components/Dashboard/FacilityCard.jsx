// const FacilityCard = ({ facility }) => {
//   const image = facility.pictures?.[0] || "/fallback.jpg"; // fallback if no image

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <img
//         src={image}
//         alt={facility.name}
//         className="w-full h-48 object-cover"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = "/fallback.png";
//         }}
//       />
//       <div className="p-4">
//         <h3 className="text-lg font-bold text-blue-700">{facility.name}</h3>
//         <p className="text-gray-600">{facility.description}</p>
//         <p className="text-sm text-gray-500 mt-2">
//           Location: {facility.location} | Price: GHS {facility.price}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FacilityCard;


const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/ddsuwfx4o/image/upload/";

const FacilityCard = ({ facility }) => {
  const imageUrl = facility.pictures?.length
    ? `${CLOUDINARY_BASE_URL}${facility.pictures[0]}`
    : "/fallback.jpg";

  return (
    <div className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <img
        src={imageUrl}
        alt={facility.name}
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-blue-600">{facility.name}</h3>
        <p className="text-sm text-gray-600">{facility.description}</p>
        <p className="text-sm text-gray-500">
          Type: {facility.type} | Location: {facility.location}
        </p>
        <p className="font-bold text-blue-700">GHS{facility.price}</p>
        <div className="flex justify-between mt-3">
          <button className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
            Book Now
          </button>
          <button className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-100">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;