// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Events from './pages/Events';
import UpcomingEvents from './pages/UpcomingEvents';
import News from './pages/News';
import Membership from './pages/Membership';
import Application from './pages/Application';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-purple-900 text-white">
          <Header />
          <main className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/upcoming-events" element={<UpcomingEvents />} />
              <Route path="/news" element={<News />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/application" element={<Application />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

// src/context/LanguageContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  
  // Load translations based on selected language
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English if there's an error
        if (language !== 'en') {
          const enModule = await import('../translations/en.json');
          setTranslations(enModule.default);
        }
      }
    };
    
    loadTranslations();
  }, [language]);
  
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };
  
  // Initialize with user's preferred language or browser language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'hi', 'kn'].includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// src/hooks/useTranslation.jsx
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const useTranslation = () => {
  const { translations } = useContext(LanguageContext);
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && Object.prototype.hasOwnProperty.call(value, k)) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return value;
  };
  
  return { t };
};