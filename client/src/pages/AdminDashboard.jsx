import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventForm from '../components/EventForm';
import { FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    date: '',
    venue: '',
    photos: '', // comma separated URLs
    description: ''
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('events');

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // Handle event creation
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('date', form.date);
      formData.append('venue', form.venue);
      formData.append('description', form.description);
      selectedFiles.forEach((file) => {
        formData.append('photos', file);
      });
      const res = await fetch('http://localhost:5000/events', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setEvents([data, ...events]);
        setShowForm(false);
        setForm({ name: '', date: '', venue: '', photos: '', description: '' });
        setSelectedFiles([]);
      } else {
        setFormError(data.error || 'Failed to create event');
      }
    } catch (err) {
      setFormError('Failed to create event');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await fetch(`http://localhost:5000/events/${eventId}`, {
        method: 'DELETE'
      });
      setEvents(events.filter(event => event._id !== eventId));
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-[#003049] to-[#669BBC] text-white p-6 rounded-t-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
              <p className="text-blue-100">Manage your website content and events</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-[#C1121F] text-white px-5 py-2 rounded-lg hover:bg-[#780000] transition-colors shadow-md flex items-center gap-2"
                onClick={() => setShowForm(true)}
              >
                <FaPlus /> Create Event
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 px-4 shadow-sm">
          <nav className="flex overflow-x-auto">
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'events' 
                ? 'border-[#003049] text-[#003049]' 
                : 'border-transparent text-gray-500 hover:text-[#669BBC] hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'users' 
                ? 'border-[#003049] text-[#003049]' 
                : 'border-transparent text-gray-500 hover:text-[#669BBC] hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'donations' 
                ? 'border-[#003049] text-[#003049]' 
                : 'border-transparent text-gray-500 hover:text-[#669BBC] hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('donations')}
            >
              Donations
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'messages' 
                ? 'border-[#003049] text-[#003049]' 
                : 'border-transparent text-gray-500 hover:text-[#669BBC] hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('messages')}
            >
              Messages
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="bg-white p-6 rounded-b-lg shadow-lg mb-8">
          {activeTab === 'events' && (
            <>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003049]"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-[#C1121F] p-4 rounded-lg border-l-4 border-[#C1121F]">
                  {error}
                </div>
              ) : (
                <motion.div 
                  className="space-y-4"
                  variants={stagger}
                >
                  {events.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <FaCalendarAlt className="mx-auto mb-4 text-4xl text-gray-300" />
                      <p>No events found. Create your first event!</p>
                    </div>
                  ) : (
                    events.map(event => (
                      <motion.div 
                        key={event._id} 
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                        variants={fadeInUp}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4">
                          {/* Event Image */}
                          <div className="md:col-span-1 bg-gray-100 flex items-center justify-center h-40 md:h-full">
                            {event.photos && event.photos.length > 0 ? (
                              <img 
                                src={event.photos[0]} 
                                alt={event.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaCalendarAlt className="text-4xl text-gray-300" />
                            )}
                          </div>
                          
                          {/* Event Details */}
                          <div className="p-4 md:col-span-3">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <h3 className="text-xl font-semibold text-[#003049]">{event.name}</h3>
                                <div className="flex items-center text-gray-600 mt-2 text-sm">
                                  <FaCalendarAlt className="mr-2 text-[#669BBC]" />
                                  {new Date(event.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </div>
                                <div className="flex items-center text-gray-600 mt-1 text-sm">
                                  <FaMapMarkerAlt className="mr-2 text-[#C1121F]" />
                                  {event.venue}
                                </div>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="mt-4 md:mt-0 flex space-x-2">
                                <button 
                                  className="p-2 text-[#669BBC] hover:bg-blue-50 rounded-full transition-colors"
                                  title="Edit Event"
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  className="p-2 text-[#C1121F] hover:bg-red-50 rounded-full transition-colors"
                                  title="Delete Event"
                                  onClick={() => handleDeleteEvent(event._id)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                            
                            <div className="mt-3 text-gray-700 line-clamp-2">
                              {event.description}
                            </div>
                            
                            {/* Photos Count */}
                            {event.photos && event.photos.length > 0 && (
                              <div className="mt-3 text-xs text-gray-500">
                                {event.photos.length} photo{event.photos.length !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </>
          )}
          
          {activeTab !== 'events' && (
            <div className="text-center py-10 text-gray-500">
              <p>This section is under development</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Event Creation Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
            >
              {/* Gradient top border */}
              <div className="h-2 bg-gradient-to-r from-[#003049] to-[#669BBC]"></div>
              
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-[#C1121F] transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowForm(false)}
              >
                <FaTimes />
              </button>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-[#003049]">Create New Event</h3>
                <EventForm
                  form={form}
                  onChange={handleChange}
                  onFileChange={handleFileChange}
                  onSubmit={handleCreateEvent}
                  loading={formLoading}
                  error={formError}
                  onCancel={() => setShowForm(false)}
                  selectedFiles={selectedFiles}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;