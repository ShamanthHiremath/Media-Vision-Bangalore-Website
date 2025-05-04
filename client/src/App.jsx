import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Donation from './pages/Donation';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
        <Footer />
        {/* Popup Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative animate-popIn">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 transition-transform duration-200 transform hover:scale-125"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Media Vision Bangalore!</h2>
              <p className="text-gray-700 text-center mb-2">This is a dummy popup modal. You can use this space for announcements, newsletter signups, or important updates.</p>
              <div className="text-center text-blue-600 font-semibold mt-4">Enjoy exploring our website!</div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
