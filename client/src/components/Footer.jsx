import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaHandHoldingHeart, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#001f30] text-gray-200 border-t border-gray-800 relative pt-10">
      <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section */}
          <div className="md:text-left text-center">
            <h3 className="text-xl font-bold mb-3 text-white border-b border-[#669BBC] pb-2 inline-block">About Us</h3>
            <p className="text-gray-300 mt-3">
              Empowering communities through education, skill development, sustainability, and social initiatives.
            </p>
            
            {/* Social Media Icons - Keep branded colors */}
            <div className="mt-8">
              <h4 className="text-white font-medium mb-2">Connect With Us</h4>
              <ul className="flex space-x-3 w-full justify-center md:justify-start">
                <li>
                  <a 
                    href="https://www.facebook.com/forwardfoundation.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="Facebook"
                  >
                    <div className="bg-[#1877F2] text-white p-2 rounded-full w-9 h-9 flex items-center justify-center">
                      <FaFacebookF size={18} />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="Instagram"
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center instagram-gradient">
                      <FaInstagram size={18} className="text-white" />
                    </div>
                  </a>
                </li>
                {/* X (Twitter) Link */}
                <li>
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="X (Twitter)"
                  >
                    <div className="bg-black text-white p-2 rounded-full w-9 h-9 flex items-center justify-center">
                      <FaXTwitter size={18} />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="LinkedIn"
                  >
                    <div className="bg-[#0A66C2] text-white p-2 rounded-full w-9 h-9 flex items-center justify-center">
                      <FaLinkedinIn size={18} />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="inline-flex items-center justify-center hover:opacity-90 transition-opacity"
                    title="YouTube"
                  >
                    <div className="bg-[#FF0000] text-white p-2 rounded-full w-9 h-9 flex items-center justify-center">
                      <FaYoutube size={18} />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Quick Links */}
            <div className="mt-8">
              <h4 className="text-white font-medium mb-3">Quick Links</h4>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-2 w-full justify-center md:justify-start">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-300 hover:text-[#669BBC] transition-colors">Events</Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-300 hover:text-white transition-colors">Team</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
                </li>
                <li>
                  <Link to="/donate" className="text-[#FF8B7E] hover:text-white font-medium transition-colors flex items-center gap-1">
                    <FaHandHoldingHeart size={14} />
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="flex flex-col max-md:items-center">
            <h3 className="text-xl font-bold mb-3 text-white border-b border-[#669BBC] pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-3 mt-3">
              <li className="flex items-center space-x-3">
                <div className="bg-[#003049] p-2 rounded-full">
                  <FiMail className="text-[#669BBC]" size={18} />
                </div>
                <span className="text-gray-300">mediavisionbng@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="bg-[#003049] p-2 rounded-full">
                  <FiPhone className="text-[#669BBC]" size={18} />
                </div>
                <span className="text-gray-300">+91 72594 56555</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-[#003049] p-2 rounded-full mt-1">
                  <FiMapPin className="text-[#669BBC]" size={18} />
                </div>
                <span className="text-gray-300">
                  300B/B, Second Floor, Okhla Main Road, Jamia Nagar, 110025, New Delhi
                </span>
              </li>
            </ul>
            
            {/* Donate Button */}
            <Link 
              to="/donate"
              className="mt-8 w-full md:w-auto flex items-center justify-center px-6 py-3 bg-[#C1121F] hover:bg-[#780000] text-white font-medium rounded-md transition-colors shadow-md"
            >
              <FaHandHoldingHeart className="mr-2" />
              Support Our Cause
            </Link>
          </div>
          
          {/* Map Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4 text-white border-b border-[#669BBC] pb-2 inline-block">Our Location</h3>
            <div className="rounded-lg overflow-hidden shadow-lg border border-[#003049] w-full">
              <iframe
                title="Organization Location"
                src="https://www.google.com/maps?q=300B/B, Second Floor, Okhla Main Road, Jamia Nagar, 110025, New Delhi&output=embed"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Media Vision Bengaluru. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* WhatsApp Button - Maintained branded style */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://api.whatsapp.com/send/?phone=919020644611&amp;text&amp;type=phone_number&amp;app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#001520] rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow inline-flex items-center justify-center"
          title="Chat with us on WhatsApp"
        >
          <div className="bg-[#25D366] rounded-full p-2">
            <FaWhatsapp size={26} className="text-white" />
          </div>
        </a>
      </div>

      {/* Add custom CSS for Instagram gradient */}
      <style jsx>{`
        .instagram-gradient {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
      `}</style>
    </footer>
  );
};

export default Footer;