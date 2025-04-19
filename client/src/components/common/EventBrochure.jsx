// src/components/common/EventBrochure.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const EventBrochure = ({ event, onClose }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Small delay before animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation to complete
  };
  
  // Close automatically after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 transition-opacity"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={handleClose}
      />
      
      <div 
        className={`relative bg-purple-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <button 
          className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
          onClick={handleClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <Link to={event.link} className="block">
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="mb-4">{event.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-300">{t('events.clickToView')}</span>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white">
                {t('events.viewDetails')}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventBrochure;