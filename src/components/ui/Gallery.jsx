import React, { useState } from "react";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/ddsuwfx4o/image/upload/";

const Gallery = ({ pictures = [] }) => {
  const [activeImage, setActiveImage] = useState(
    pictures[0]?.startsWith("http") ? pictures[0] : `${CLOUDINARY_BASE_URL}${pictures[0]}`
  );

  const images = pictures.map(pic =>
    pic.startsWith("http") ? pic : `${CLOUDINARY_BASE_URL}${pic}`
  );

  return (
    <div className="flex gap-4">
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
          alt="Main View"
          className="w-full h-[350px] object-cover rounded-md shadow-xl"
        />
      </div>
    </div>
  );
};

export default Gallery;
