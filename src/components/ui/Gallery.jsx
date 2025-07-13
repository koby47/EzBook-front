import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/ddsuwfx4o/image/upload/";

const Gallery = ({ pictures = [] }) => {
  if (!pictures.length) {
    return <p className="text-gray-500">No images available.</p>;
  }

  const formattedImages = pictures.map(pic =>
    pic.startsWith("http") ? pic : `${CLOUDINARY_BASE_URL}${pic}`
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? formattedImages.length - 1 : prevIndex - 1
    );
  }, [formattedImages]);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === formattedImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [formattedImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 md:w-20">
          {formattedImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition duration-200 ${
                activeIndex === index ? "border-blue-600 shadow-md" : "border-gray-300"
              } hover:scale-105`}
            />
          ))}
        </div>

        {/* Active Image */}
        <div className="flex-1">
          <img
            src={formattedImages[activeIndex]}
            alt={`Selected view ${activeIndex + 1}`}
            className="w-full max-h-[400px] object-cover rounded-md shadow-xl transition duration-300 cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          {...handlers}
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            &times;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 text-white text-4xl font-bold"
          >
            &#8592;
          </button>

          <img
            src={formattedImages[activeIndex]}
            alt={`Full view ${activeIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 text-white text-4xl font-bold"
          >
            &#8594;
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
