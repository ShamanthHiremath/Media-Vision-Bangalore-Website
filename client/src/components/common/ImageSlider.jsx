// src/components/common/ImageSlider.jsx
import React, { useState, useEffect, useRef } from 'react';

const ImageSlider = ({ images, autoSlide = true, slideInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  
  // Handle touch events for swipe functionality
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  
  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return;
    }
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchPosition - currentTouch;
    
    // Swipe threshold of 50px
    if (diff > 50) {
      goToNext();
      setTouchPosition(null);
    }
    
    if (diff < -50) {
      goToPrevious();
      setTouchPosition(null);
    }
  };
  
  // Auto slide functionality
  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    
    if (autoSlide) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, slideInterval);
    }
    
    return () => resetTimeout();
  }, [currentIndex, autoSlide]);
  
  return (
    <div className="relative h-96 w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="flex h-full">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className="min-w-full h-full flex-shrink-0"
            >
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-6 text-white w-full">
                  <h2 className="text-3xl font-bold mb-2">{image.alt}</h2>
                  {image.description && (
                    <p className="text-lg">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={goToPrevious}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={goToNext}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;