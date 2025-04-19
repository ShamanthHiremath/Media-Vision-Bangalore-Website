// src/components/common/LanguageSelector.jsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }, // Hindi
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }, // Kannada
  ];
  
  // Get current language data
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };
  
  return (
    <div className="relative mr-6" ref={dropdownRef}>
      <button 
        className="flex items-center text-white hover:text-gray-200 focus:outline-none"
        onClick={toggleDropdown}
      >
        <span className="mr-1">{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.name}</span>
        <svg 
          className="w-4 h-4 ml-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-40 bg-purple-800 rounded-md shadow-xl z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 text-sm ${
                language === lang.code 
                  ? 'bg-purple-700 text-white' 
                  : 'text-white hover:bg-purple-700'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;