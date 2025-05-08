import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaHandHoldingHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-100 relative">
      <div className="container mx-auto px-2 py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="md:text-left text-center">
            <h3 className="text-xl font-bold mb-2 text-[#003049]">About Us</h3>
            <p className="text-gray-600">
              Empowering communities through education, skill development, sustainability, and social initiatives.
            </p>
            
            {/* Social Media Icons */}
            <div className="mt-6">
              <h4 className="text-[#003049] font-medium mb-1">Connect With Us</h4>
              <ul className="flex space-x-2 w-full justify-center md:justify-start">
                <li>
                  <a 
                    href="https://www.facebook.com/forwardfoundation.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#003049] text-white p-2 rounded-full inline-flex items-center justify-center hover:bg-[#669BBC] transition-colors"
                  >
                    <FiFacebook size={18} />
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="bg-[#003049] text-white p-2 rounded-full inline-flex items-center justify-center hover:bg-[#669BBC] transition-colors"
                  >
                    <FiInstagram size={18} />
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="bg-[#003049] text-white p-2 rounded-full inline-flex items-center justify-center hover:bg-[#669BBC] transition-colors"
                  >
                    <FiLinkedin size={18} />
                  </a>
                </li>
                <li>
                  <a 
                    href="#0"
                    className="bg-[#003049] text-white p-2 rounded-full inline-flex items-center justify-center hover:bg-[#669BBC] transition-colors"
                  >
                    <FiYoutube size={18} />
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Quick Links */}
            <div className="mt-8">
              <h4 className="text-[#003049] font-medium mb-2">Quick Links</h4>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-2 w-full justify-center md:justify-start">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-[#003049] transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-[#003049] transition-colors">About</Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-600 hover:text-[#669BBC] transition-colors">Events</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-[#003049] transition-colors">Contact</Link>
                </li>
                <li>
                  <Link to="/donate" className="text-[#C1121F] hover:text-[#780000] font-medium transition-colors flex items-center gap-1">
                    <FaHandHoldingHeart size={14} />
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="flex flex-col max-md:items-center">
            <h3 className="text-xl font-bold mb-2 text-[#003049]">Contact Us</h3>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center space-x-3">
                <div className="bg-[#669BBC]/10 p-2 rounded-full">
                  <FiMail className="text-[#003049]" size={18} />
                </div>
                <span className="text-gray-600">forwardfoundation.in@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="bg-[#669BBC]/10 p-2 rounded-full">
                  <FiPhone className="text-[#003049]" size={18} />
                </div>
                <span className="text-gray-600">+91 85956 56583</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-[#669BBC]/10 p-2 rounded-full mt-1">
                  <FiMapPin className="text-[#003049]" size={18} />
                </div>
                <span className="text-gray-600">
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
            <h3 className="text-xl font-bold mb-4 text-[#003049]">Our Location</h3>
            <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 w-full">
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
        <div className="border-t border-gray-100 mt-4 pt-2 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Forward Foundation. All rights reserved.
          </p>
          <p className="text-gray-500">
            Powered by{' '}
            <a href="https://www.channelsoftech.com/visit-from-client-website.php" className="text-[#003049] hover:text-[#669BBC] transition-colors">
              Channel Softech
            </a>
          </p>
        </div>
      </div>
      
      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://api.whatsapp.com/send/?phone=919020644611&amp;text&amp;type=phone_number&amp;app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow inline-flex items-center justify-center"
        >
          <div className="bg-green-500 rounded-full p-2">
            <svg viewBox="0 0 24 24" fill="white" height="26" width="26">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.72 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
            </svg>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;