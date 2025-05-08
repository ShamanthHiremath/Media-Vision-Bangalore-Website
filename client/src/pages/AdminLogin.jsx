import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Call backend for login
      const res = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        window.location.href = '/'; // redirect or show admin dashboard
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#003049]">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to access the administrator dashboard
          </p>
        </div>
        
        <motion.div 
          className="mt-8 bg-white py-8 px-6 shadow-lg rounded-lg border-t-4 border-[#003049]"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-[#669BBC]" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="focus:ring-[#003049] focus:border-[#003049] block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Admin Username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-[#669BBC]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="focus:ring-[#003049] focus:border-[#003049] block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-[#669BBC]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="focus:ring-[#003049] focus:border-[#003049] block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-[#C1121F] p-4 rounded">
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

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#003049] hover:bg-[#00243a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003049] transition-colors duration-300"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaSignInAlt className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                </span>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </motion.div>
        
        <motion.div 
          className="text-center mt-4 text-sm text-gray-600"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <p>Forgot your password? <a href="#" className="font-medium text-[#669BBC] hover:text-[#003049] transition-colors">Reset it here</a></p>
          <p className="mt-1">Need help? <a href="/contact" className="font-medium text-[#669BBC] hover:text-[#003049] transition-colors">Contact support</a></p>
        </motion.div>
        
        <motion.div 
          className="text-center mt-8"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xs text-gray-500">
            <p>This is a secure administrative area.</p>
            <p>Unauthorized access is prohibited and may be subject to legal action.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;