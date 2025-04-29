import React, { useEffect, useRef } from 'react';

const GoogleTranslate = () => {
  const translateRef = useRef(null);

  useEffect(() => {
    // Add Google Translate script if it doesn't already exist
    if (!document.querySelector('#google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      if (translateRef.current) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,kn,hi,ta,te,ml,bn,ur',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          translateRef.current
        );
      }
    };

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div
      ref={translateRef}
      className="google-translate-custom text-sm"
    ></div>
  );
};

export default GoogleTranslate;
