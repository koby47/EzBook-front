import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FacilityDetailsModal =({facility,onClose}) =>{if (!facility) return null;
    return(
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2">
                    <XMarkIcon className="h-6 w-6 text-gray-700"/>
                </button>
                <h2 className="text-2xl font-bold mb-4">{facility.name}</h2>
                <div className="mb-4">
                    <p><strong>Location:</strong>{facility.location}</p>
                    <p><strong>Price:</strong>GHS{facility.price.toFixed(2)}</p>
                     <p><strong>Availability:</strong> {facility.availability ? "Available" : "Unavailable"}</p>
          <p><strong>Description:</strong> {facility.description}</p>

          <div className="grid grid-cols-2 gap-2 mt-4">
           {facility.pictures?.map((pic, idx) => (
              <img key={idx} src={pic} alt={`pic-${idx}`} className="w-full h-32 object-cover rounded" />
            ))}
          </div>

                </div>

            </div>
        </div>
        
        </>
    );
}

export default FacilityDetailsModal;