import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiSend, FiUser } from "react-icons/fi";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

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

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Contact Header */}
        <motion.section
          className="mb-12 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl font-bold mb-4"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </motion.section>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Contact Information */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">123 Organization Street, City, Country</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@organization.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4 mt-1">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+1 (234) 567-8900</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FiUser size={40} className="text-gray-400" />
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6 relative">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <span className="absolute left-3 top-10 text-gray-400">
                  <FiUser />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
        {/* Google Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Find Us Here</h2>
          <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Organization Location"
              src="https://www.google.com/maps?q=123+Organization+Street,+City,+Country&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
