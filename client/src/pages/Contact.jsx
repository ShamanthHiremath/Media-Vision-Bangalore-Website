import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiSend } from "react-icons/fi";
import { FaUser, FaEnvelope, FaEdit, FaComments } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from "react-icons/fa6";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
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
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl max-w-3xl mx-auto"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Contact Information */}
          <motion.div
            className="md:col-span-2"
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg h-full border-l-4 border-[#003049]">
              <h2 className="text-2xl font-bold mb-6 text-[#003049] border-b-2 border-[#669BBC] pb-2 inline-block">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="text-[#003049] mr-4 mt-1 bg-gray-100 p-3 rounded-full">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003049]">Address</h3>
                    <p className="text-gray-600">123 Organization Street, City, Country</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-[#669BBC] mr-4 mt-1 bg-gray-100 p-3 rounded-full">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003049]">Email</h3>
                    <p className="text-gray-600">mediavisionbng@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-[#C1121F] mr-4 mt-1 bg-gray-100 p-3 rounded-full">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#003049]">Phone</h3>
                    <p className="text-gray-600">+91 72594 56555</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-[#003049] mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com/forwardfoundation.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="Facebook"
                  >
                    <div className="bg-[#1877F2] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                      <FaFacebookF size={18} />
                    </div>
                  </a>
                  
                  {/* Instagram */}
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="Instagram"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center instagram-gradient">
                      <FaInstagram size={18} className="text-white" />
                    </div>
                  </a>
                  
                  {/* X (Twitter) */}
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="X (Twitter)"
                  >
                    <div className="bg-black text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                      <FaXTwitter size={18} />
                    </div>
                  </a>
                  
                  {/* LinkedIn */}
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="LinkedIn"
                  >
                    <div className="bg-[#0A66C2] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                      <FaLinkedinIn size={18} />
                    </div>
                  </a>
                  
                  {/* YouTube */}
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="YouTube"
                  >
                    <div className="bg-[#FF0000] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                      <FaYoutube size={18} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="md:col-span-3"
            variants={fadeInUp}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-[#669BBC]">
              <h2 className="text-2xl font-bold mb-6 text-[#003049] border-b-2 border-[#669BBC] pb-2 inline-block">Send a Message</h2>
              
              <div className="mb-6 relative">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-[#003049]">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-[#003049]"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6 relative">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-[#669BBC]">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#669BBC] focus:border-[#669BBC]"
                    placeholder="Your email address"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6 relative">
                <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                  Subject
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-[#003049]">
                    <FaEdit />
                  </span>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003049] focus:border-[#003049]"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6 relative">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-[#669BBC]">
                    <FaComments />
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#669BBC] focus:border-[#669BBC]"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#C1121F] hover:bg-[#780000] text-white py-3 px-6 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <FiSend />
                Send Message
              </button>
              
              {status && (
                <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                  {status}
                </div>
              )}
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                  {error}
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
        
        {/* Google Map Section */}
        <motion.div 
          className="mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold mb-6 text-[#003049] border-b-2 border-[#669BBC] pb-2 inline-block">Find Us Here</h2>
          <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg border-t-4 border-[#003049]">
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
        </motion.div>
      </div>
      
      {/* Call to Action */}
      <motion.section
        className="bg-gradient-to-r from-[#003049] to-[#669BBC] text-white py-16 mt-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team is ready to help you with any questions or concerns you may have.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="bg-white text-[#003049] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg flex items-center gap-2"
            >
              <FiPhone /> Call Now
            </a>
            <a
              href="mailto:info@mediavision.com"
              className="bg-[#C1121F] hover:bg-[#780000] text-white px-8 py-3 rounded-lg font-semibold transition duration-300 shadow-lg flex items-center gap-2"
            >
              <FiMail /> Email Us
            </a>
          </div>
        </div>
      </motion.section>

      {/* Add Instagram gradient style */}
      <style jsx>{`
        .instagram-gradient {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
      `}</style>
    </div>
  );
}

export default Contact;
