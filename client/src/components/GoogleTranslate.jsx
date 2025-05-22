import React, { useEffect } from 'react';
import './GoogleTranslate.css';

const GoogleTranslate = () => {
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,kn,ta,te,ml,mr,gu,bn,pa,ur', // Common Indian languages + English
          layout: window.innerWidth <= 768 
            ? google.translate.TranslateElement.InlineLayout.SIMPLE 
            : google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false
        },
        'google_translate_element'
      );
    };

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    }
  }, []);

  return (
    <div className="relative flex items-center">
      <div 
        id="google_translate_element" 
        className="google-translate-container md:ml-2"
        aria-label="Language Selector"
      />
    </div>
  );
};

export default GoogleTranslate;