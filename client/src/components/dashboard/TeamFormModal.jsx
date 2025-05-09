import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUpload, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TeamFormModal = ({ show, onClose, onSuccess, teamMember }) => {
  const [form, setForm] = useState({
    name: '',
    position: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set form data when editing an existing team member
  useEffect(() => {
    if (teamMember) {
      setForm({
        name: teamMember.name || '',
        position: teamMember.position || '',
        description: teamMember.description || ''
      });
      
      if (teamMember.image) {
        setPreviewUrl(teamMember.image);
      }
    } else {
      // Reset form when adding a new team member
      setForm({
        name: '',
        position: '',
        description: ''
      });
      setSelectedFile(null);
      setPreviewUrl('');
    }
  }, [teamMember]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (!form.name || !form.position || !form.description) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    // Validate file for new team members
    if (!teamMember && !selectedFile) {
      setError('Team member image is required');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('position', form.position);
      formData.append('description', form.description);
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const token = localStorage.getItem('admin_token');
      const url = teamMember 
        ? `${process.env.REACT_APP_API_URL}/team/${teamMember._id}`
        : `${process.env.REACT_APP_API_URL}/team`;
        
      const method = teamMember ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save team member');
      }

      const message = teamMember 
        ? 'Team member updated successfully!' 
        : 'Team member added successfully!';
        
      toast.success(message, {
        position: "top-right",
        autoClose: 3000
      });
      
      onSuccess(message);
    } catch (err) {
      console.error('Error saving team member:', err);
      setError(err.message || 'Failed to save team member');
      toast.error(err.message || 'Failed to save team member', {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Gradient top border */}
            <div className="h-2 bg-gradient-to-r from-[#003049] to-[#669BBC]"></div>
            
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-[#C1121F] transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              onClick={onClose}
            >
              <FaTimes />
            </button>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-[#003049]">
                {teamMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>

              {error && (
                <div className="bg-red-50 border-l-4 border-[#C1121F] p-4 mb-6 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-[#C1121F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-[#C1121F]">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-[#003049] focus:border-[#003049]"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                        Position
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-[#003049] focus:border-[#003049]"
                        placeholder="Director"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Bio/Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-[#003049] focus:border-[#003049]"
                        placeholder="Brief biography or description..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Member Photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-64">
                      {previewUrl ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl('');
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1 text-center flex flex-col items-center justify-center w-full">
                          <div className="mx-auto h-20 w-20 text-gray-400 mb-2">
                            <FaUser className="h-20 w-20" />
                          </div>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#003049] hover:text-[#669BBC] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#003049]">
                              <span>Upload a photo</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                accept="image/*"
                                className="sr-only" 
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003049]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#003049] hover:bg-[#00243a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003049] flex items-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaUpload className="mr-2" />
                        {teamMember ? 'Update Team Member' : 'Add Team Member'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamFormModal;