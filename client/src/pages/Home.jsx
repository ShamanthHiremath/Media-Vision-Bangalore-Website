// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import ImageSlider from '../components/common/ImageSlider';
import EventBrochure from '../components/common/EventBrochure';
import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
  const { t } = useTranslation();
  const [showBrochure, setShowBrochure] = useState(false);
  
  // Example slider images
  const sliderImages = [
    { id: 1, url: '/src/assets/images/slider1.jpg', alt: 'Media Vision Event' },
    { id: 2, url: '/src/assets/images/slider2.jpg', alt: 'Community Activity' },
    { id: 3, url: '/src/assets/images/slider3.jpg', alt: 'Workshop Session' },
  ];
  
  // Latest event brochure
  const latestEvent = {
    id: 1,
    image: '/src/assets/images/event-brochure.jpg',
    title: 'Annual Media Conference 2025',
    link: '/events/annual-media-conference-2025'
  };
  
  // Show brochure after navigation
  useEffect(() => {
    const brochureTimer = setTimeout(() => {
      setShowBrochure(true);
    }, 3000);
    
    return () => clearTimeout(brochureTimer);
  }, []);
  
  return (
    <div className="bg-purple-900 min-h-screen text-white">
      {/* Hero Section with Slider */}
      <section className="w-full">
        <ImageSlider images={sliderImages} autoSlide={true} slideInterval={5000} />
      </section>
      
      {/* Welcome Section */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">{t('welcome.title')}</h1>
        <p className="text-lg mb-8">
          {t('welcome.description')}
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-purple-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{t('home.mission')}</h2>
            <p>{t('home.missionText')}</p>
          </div>
          
          <div className="bg-purple-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{t('home.vision')}</h2>
            <p>{t('home.visionText')}</p>
          </div>
          
          <div className="bg-purple-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{t('home.values')}</h2>
            <p>{t('home.valuesText')}</p>
          </div>
        </div>
      </section>
      
      {/* Recent Events */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">{t('home.recentEvents')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Event cards would go here */}
          <div className="bg-purple-800 p-4 rounded-lg shadow-md">
            <img src="/src/assets/images/event1.jpg" alt="Event" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Media Workshop</h3>
            <p className="mb-4">A comprehensive workshop on modern media techniques.</p>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              {t('common.readMore')}
            </button>
          </div>
          
          <div className="bg-purple-800 p-4 rounded-lg shadow-md">
            <img src="/src/assets/images/event2.jpg" alt="Event" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Film Festival</h3>
            <p className="mb-4">Annual film festival showcasing local talent.</p>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              {t('common.readMore')}
            </button>
          </div>
          
          <div className="bg-purple-800 p-4 rounded-lg shadow-md">
            <img src="/src/assets/images/event3.jpg" alt="Event" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Panel Discussion</h3>
            <p className="mb-4">Industry experts discussing the future of media.</p>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              {t('common.readMore')}
            </button>
          </div>
        </div>
      </section>
      
      {/* Event Brochure Modal */}
      {showBrochure && <EventBrochure event={latestEvent} onClose={() => setShowBrochure(false)} />}
    </div>
  );
};

export default Home;