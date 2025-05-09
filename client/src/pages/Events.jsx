import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };
  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
        setEvents(response.data);
        // If events exist, set the first event as selected by default
        if (response.data.length > 0) {
          setSelectedEventId(response.data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto-move carousel
  useEffect(() => {
    const selectedEvent = events.find(e => e._id === selectedEventId);
    if (!selectedEvent || !autoPlay || !selectedEvent.photos || selectedEvent.photos.length <= 1) return;
    
    const interval = setInterval(() => {
      setCarouselIdx((idx) => (idx + 1) % selectedEvent.photos.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [selectedEventId, autoPlay, events]);

  // Reset carousel index when event changes
  useEffect(() => {
    setCarouselIdx(0);
    setAutoPlay(true);
  }, [selectedEventId]);

  // Get selected event object
  const selectedEvent = events.find(e => e._id === selectedEventId);

  // Filter events into upcoming and past events
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison
  
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending
  
  const pastEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < today;
  }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending (newest first)

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#003049]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-[#C1121F] p-8 rounded-lg border-l-4 border-[#C1121F] max-w-md">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <motion.section
        className="bg-gradient-to-r from-[#003049] to-[#669BBC] text-white py-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Events
          </motion.h1>
          <motion.p
            className="text-xl max-w-3xl mx-auto"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join us for our upcoming events and activities that make a difference
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto py-12 px-4">
        {/* Event Grid */}
        {showGrid && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-4"
          >
            {/* Upcoming Events Section */}
            {upcomingEvents.length > 0 && (
              <div className="mb-12">
                <motion.div 
                  variants={fadeInUp}
                  className="mb-8 text-center"
                >
                  <h2 className="text-3xl font-bold mb-4 text-[#003049] border-b-2 border-[#669BBC] pb-2 inline-block">Upcoming Events</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Join us at our upcoming events and be part of our community initiatives.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                  variants={stagger}
                >
                  {upcomingEvents.map((event, idx) => (
                    <motion.div
                      key={event._id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden border-t-4"
                      style={{ borderColor: idx === 0 ? '#003049' : idx === 1 ? '#669BBC' : '#C1121F' }}
                      onClick={() => { setSelectedEventId(event._id); setShowGrid(false); }}
                      variants={fadeInUp}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <div className="relative">
                        <img
                          src={event.photos && event.photos.length > 0 ? event.photos[0] : '/placeholder-event.jpg'}
                          alt={event.name}
                          className="w-full h-52 object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-event.jpg';
                          }}
                        />
                        <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#003049] mb-2">{event.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="text-[#669BBC] mr-2" />
                          <span>{event.venue}</span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{event.description}</p>
                        <button className="mt-4 text-[#C1121F] font-medium hover:text-[#780000] transition flex items-center">
                          View Details <FaArrowRight className="ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
            
            {/* Past Events Section */}
            {pastEvents.length > 0 && (
              <div className="mt-12">
                <motion.div 
                  variants={fadeInUp}
                  className="mb-8 text-center"
                >
                  <h2 className="text-3xl font-bold mb-4 text-[#003049] border-b-2 border-[#669BBC] pb-2 inline-block">Past Events</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Explore our previous events and the impact they've made in our community.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                  variants={stagger}
                >
                  {pastEvents.map((event, idx) => (
                    <motion.div
                      key={event._id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden border-t-4"
                      style={{ borderColor: idx % 3 === 0 ? '#003049' : idx % 3 === 1 ? '#669BBC' : '#C1121F' }}
                      onClick={() => { setSelectedEventId(event._id); setShowGrid(false); }}
                      variants={fadeInUp}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <div className="relative">
                        <img
                          src={event.photos && event.photos.length > 0 ? event.photos[0] : '/placeholder-event.jpg'}
                          alt={event.name}
                          className="w-full h-52 object-cover grayscale-[30%]"
                          onError={(e) => {
                            e.target.src = '/placeholder-event.jpg';
                          }}
                        />
                        <div className="absolute top-0 right-0 bg-gray-700 text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#003049] mb-2">{event.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaMapMarkerAlt className="text-[#669BBC] mr-2" />
                          <span>{event.venue}</span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{event.description}</p>
                        <button className="mt-4 text-[#C1121F] font-medium hover:text-[#780000] transition flex items-center">
                          View Details <FaArrowRight className="ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
            
            {/* No events message */}
            {events.length === 0 && (
              <motion.div 
                variants={fadeInUp}
                className="text-center py-12 bg-gray-50 rounded-lg"
              >
                <FaCalendarAlt className="mx-auto text-5xl text-gray-300 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No events available</h3>
                <p className="text-gray-500">Check back soon for upcoming events!</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Full Event Info (Detail View) */}
        {!showGrid && selectedEvent && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.button
              className="mb-6 px-4 py-2 bg-white hover:bg-gray-100 text-[#003049] font-semibold rounded-lg shadow flex items-center transition duration-300"
              onClick={() => setShowGrid(true)}
              variants={fadeInUp}
            >
              <FaArrowLeft className="mr-2" /> Back to Events
            </motion.button>

            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12 border-t-4 border-[#003049]"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              {/* Carousel for images */}
              {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                <div className="relative w-full flex flex-col items-center mb-8">
                  <div className="relative w-full max-w-4xl h-[320px] md:h-[480px] flex items-center justify-center mx-auto rounded-lg overflow-hidden shadow-lg">
                    {selectedEvent.photos.length > 1 && (
                      <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow hover:bg-[#003049] hover:text-white z-10 transition-colors"
                        onClick={() => {
                          setAutoPlay(false);
                          setCarouselIdx((carouselIdx - 1 + selectedEvent.photos.length) % selectedEvent.photos.length);
                        }}
                      >
                        <FaArrowLeft />
                      </button>
                    )}
                    
                    <img
                      src={selectedEvent.photos[carouselIdx]}
                      alt={selectedEvent.name}
                      className="object-cover h-full w-full transition-all duration-500"
                      onError={(e) => {
                        e.target.src = '/placeholder-event.jpg';
                      }}
                    />
                    
                    {selectedEvent.photos.length > 1 && (
                      <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow hover:bg-[#003049] hover:text-white z-10 transition-colors"
                        onClick={() => {
                          setAutoPlay(false);
                          setCarouselIdx((carouselIdx + 1) % selectedEvent.photos.length);
                        }}
                      >
                        <FaArrowRight />
                      </button>
                    )}
                  </div>
                  
                  {selectedEvent.photos.length > 1 && (
                    <div className="flex gap-2 mt-6 justify-center">
                      {selectedEvent.photos.map((_, idx) => (
                        <button
                          key={idx}
                          className={`w-4 h-4 rounded-full ${idx === carouselIdx ? 'bg-[#003049] border-[#003049]' : 'bg-gray-200 border-gray-300'} border-2 transition-colors`}
                          onClick={() => {
                            setAutoPlay(false);
                            setCarouselIdx(idx);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Event details below carousel */}
              <div className="px-2">
                <h3 className="text-3xl font-bold mb-4 text-[#003049] border-b-2 border-[#669BBC] pb-2 inline-block">{selectedEvent.name}</h3>
                
                <div className="flex flex-wrap gap-8 mb-6 text-lg text-gray-700">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-[#669BBC] mr-3" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-[#C1121F] mr-3" />
                    <span>{selectedEvent.venue}</span>
                  </div>
                </div>
                
                <div className="text-gray-700 mt-6 whitespace-pre-line text-lg leading-relaxed bg-gray-50 p-6 rounded-lg border-l-4 border-[#669BBC]">
                  {selectedEvent.description}
                </div>
                
                {/* Event status badge */}
                <div className="mt-8">
                  {new Date(selectedEvent.date) >= today ? (
                    <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Upcoming Event
                    </span>
                  ) : (
                    <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                      Past Event
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Other Events Section */}
            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-2xl font-bold mb-6 text-[#003049] border-b-2 border-[#669BBC] pb-2 inline-block">Other Events</h4>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                variants={stagger}
              >
                {events
                  .filter(e => e._id !== selectedEventId)
                  .slice(0, 4) // Show up to 4 other events
                  .map((event, idx) => (
                    <motion.div
                      key={event._id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden border-l-4 flex"
                      style={{ borderColor: idx === 0 ? '#003049' : idx === 1 ? '#669BBC' : idx === 2 ? '#C1121F' : '#FDF0D5' }}
                      onClick={() => { setSelectedEventId(event._id); setCarouselIdx(0); setAutoPlay(true); }}
                      variants={fadeInUp}
                    >
                      <img
                        src={event.photos && event.photos.length > 0 ? event.photos[0] : '/placeholder-event.jpg'}
                        alt={event.name}
                        className="w-24 h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-event.jpg';
                        }}
                      />
                      <div className="p-4 flex-1">
                        <h3 className="text-lg font-semibold text-[#003049]">{event.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <FaCalendarAlt className="text-[#669BBC] mr-2" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm line-clamp-1">{event.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <motion.section
        className="bg-gradient-to-r from-[#003049] to-[#669BBC] text-white py-16 mt-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Planning an Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with Media Vision to organize and promote your next event. Our team will help ensure its success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-[#003049] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Contact Our Team
            </a>
            <a
              href="#"
              className="bg-[#C1121F] hover:bg-[#780000] text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              View Event Calendar
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Events;