import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              Empowering communities through education, skill development, sustainability, and social initiatives.
            </p>
            <ul className="flex space-x-4 mt-4">
              <li>
                <a href="https://www.facebook.com/forwardfoundation.in" target="_blank" rel="noopener noreferrer">
                  <FiFacebook size={20} />
                </a>
              </li>
              <li>
                <a href="#0">
                  <FiInstagram size={20} />
                </a>
              </li>
              <li>
                <a href="#0">
                  <FiLinkedin size={20} />
                </a>
              </li>
              <li>
                <a href="#0">
                  <FiYoutube size={20} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="text-gray-300 hover:text-white">
                  Achievements
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-white">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Email: forwardfoundation.in@gmail.com<br />
              Phone: +91 85956 56583
            </p>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center space-x-2">
                <FiMail />
                <span>forwardfoundation.in@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone />
                <span>+91 85956 56583</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMapPin />
                <span>300B/B, Second Floor, Okhla Main Road, Jamia Nagar, 110025, New Delhi</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Forward Foundation. All rights reserved.
          </p>
          <p className="text-gray-300">
            Powered by{' '}
            <a href="https://www.channelsoftech.com/visit-from-client-website.php" className="text-gray-300 hover:text-white">
              Channel Softech
            </a>
          </p>
        </div>
      </div>
      <div className="whatsapp fixed bottom-4 right-4">
        <a
          href="https://api.whatsapp.com/send/?phone=919020644611&amp;text&amp;type=phone_number&amp;app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/images/whatsapp.png" alt="WhatsApp" className="w-12 h-12" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;