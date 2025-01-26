import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

const TextSlider = () => {
  const slides = [
    'The Game has Changed!',
    'Predict Correct Questions!',
    'Enjoy the Experience!',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically switch slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slides.length]);

  // Handle swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((currentIndex + 1) % slides.length),
    onSwipedRight: () =>
      setCurrentIndex((currentIndex - 1 + slides.length) % slides.length),
  });

  // Handle dot navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Slide Content */}
      <div
        {...swipeHandlers}
        className="bg-gray-100 px-4 py-4 md:py-2 mt-0 md:mt-4 rounded-lg flex flex-col items-center justify-center w-full sm:w-[90%] touch-pan-y"
      >
        <div className="text-base sm:text-lg font-medium text-[#000066] md:h-12 flex items-center justify-center text-center">
          {slides[currentIndex]}
        </div>
      </div>
      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 my-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition duration-300 ${
              index === currentIndex
                ? 'bg-primaryColor shadow-md scale-110'
                : 'bg-white opacity-70 hover:opacity-100'
            }`}
          ></button>
        ))}
      </div>
    </>
  );
};

export default TextSlider;