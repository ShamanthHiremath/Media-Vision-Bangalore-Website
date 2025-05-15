import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import EventForm from '../EventForm';
import DragDropImageUpload from '../DragDropImageUpload';

const EventFormModal = ({ show, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    venue: '',
    description: ''
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [photoFiles, setPhotoFiles] = useState([]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle photo files change
  const handlePhotosChange = (files) => {
    setPhotoFiles(files);
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
      
      // Append all photo files
      photoFiles.forEach((fileObj) => {
        formData.append('photos', fileObj.file);
      });
      
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setForm({ name: '', date: '', venue: '', description: '' });
        setPhotoFiles([]);
        onSuccess('Event created successfully!');
        onClose();
      } else {
        setFormError(data.error || 'Failed to create event');
      }
    } catch (err) {
      setFormError('Failed to create event');
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle modal close and reset form
  const handleClose = () => {
    setForm({ name: '', date: '', venue: '', description: '' });
    setPhotoFiles([]);
    setFormError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full relative my-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Gradient top border */}
            <div className="h-2 bg-gradient-to-r from-[#003049] to-[#669BBC]"></div>
            
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-[#C1121F] transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              onClick={handleClose}
            >
              <FaTimes />
            </button>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-[#003049]">Create New Event</h3>
              <EventForm
                form={form}
                onChange={handleChange}
                onSubmit={handleCreateEvent}
                loading={formLoading}
                error={formError}
                onCancel={handleClose}
                photoFiles={photoFiles}
                onPhotosChange={handlePhotosChange}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventFormModal;