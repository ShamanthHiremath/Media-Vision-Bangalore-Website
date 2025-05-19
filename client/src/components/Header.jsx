import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiInfo, FiMail, FiMenu, FiX, FiCamera } from "react-icons/fi";
import { FaCalendarAlt, FaHandHoldingHeart, FaUserPlus } from "react-icons/fa";
import GoogleTranslate from './GoogleTranslate';
import logo from '../assets/logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    if (menuOpen) {
      const closeMenu = (e) => {
        // Close if click is outside the menu
        if (!e.target.closest('.mobile-menu') && !e.target.closest('button[aria-label="Toggle menu"]')) {
          setMenuOpen(false);
        }
      };

      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [menuOpen]);

  // Close menu when a link is clicked (for better UX)
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-lg relative z-50">
      <div className="container mx-auto px-4">
        {/* Main navigation */}
        <nav className="py-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <img src={logo} className="h-12 md:h-15 mr-3" alt="Logo" />
            <span className="text-2xl font-bold text-blue-900 hidden sm:inline">
              Media Vision Bengaluru
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-blue-900 text-white font-medium"
                  : "text-blue-900 hover:bg-gray-100"
                }`
              }
            >
              <FiHome />
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-blue-900 text-white font-medium"
                  : "text-blue-900 hover:bg-gray-100"
                }`
              }
            >
              <FiInfo />
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-blue-900 text-white font-medium"
                  : "text-blue-900 hover:bg-gray-100"
                }`
              }
            >
              <FiMail />
              Contact
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-blue-900 text-white font-medium"
                  : "text-blue-900 hover:bg-gray-100"
                }`
              }
            >
              <FaCalendarAlt />
              Events
            </NavLink>

            {/* Gallery Link */}
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-blue-900 text-white font-medium"
                  : "text-blue-900 hover:bg-gray-100"
                }`
              }
            >
              <FiCamera />
              Gallery
            </NavLink>

            {/* Registration Link */}
            <NavLink
              to="/registration"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-blue-900 text-white font-medium"
                  : "text-blue-900 hover:bg-gray-100"
                }`
              }
            >
              <FaUserPlus />
              Registration
            </NavLink>

            <NavLink
              to="/donate"
              className="flex items-center gap-2 px-4 py-2 bg-[#C1121F] hover:bg-[#780000] text-white font-medium rounded-md transition-colors shadow-md"
            >
              <FaHandHoldingHeart />
              Donate
            </NavLink>

            {/* Google Translate integrated in navbar */}
            <div className="flex items-center ml-2 bg-gray-50 rounded-md px-3 py-1 shadow-sm hover:shadow transition-shadow">
              <span
                className="text-sm text-[#AE1F23] font-semibold cursor-pointer inline mr-1 hover:underline"
                onClick={() => {
                  let attempts = 0;
                  const tryOpenDropdown = () => {
                    const combo = document.querySelector('.goog-te-combo');
                    if (combo) {
                      combo.focus();
                      combo.click();
                      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40, which: 40 });
                      combo.dispatchEvent(event);
                    } else if (attempts < 5) {
                      attempts++;
                      setTimeout(tryOpenDropdown, 300);
                    }
                  };
                  tryOpenDropdown();
                }}
              >
                Translate:
              </span>
              <GoogleTranslate />
            </div>
          </div>

          {/* Mobile - Logo, Translate and Burger */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Google Translate for Mobile */}
            <div className="flex items-center bg-gray-50 rounded-md px-2 py-1 shadow-sm hover:shadow transition-shadow">
              <span
                className="text-sm text-[#AE1F23] font-semibold cursor-pointer inline mr-1 hover:underline"
                onClick={() => {
                  let attempts = 0;
                  const tryOpenDropdown = () => {
                    const combo = document.querySelector('.goog-te-combo');
                    if (combo) {
                      combo.focus();
                      combo.click();
                      const event = new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40, which: 40 });
                      combo.dispatchEvent(event);
                    } else if (attempts < 5) {
                      attempts++;
                      setTimeout(tryOpenDropdown, 300);
                    }
                  };
                  tryOpenDropdown();
                }}
              >
                <span className="sr-only md:not-sr-only">Translate:</span>
              </span>
              <GoogleTranslate />
            </div>

            {/* Mobile Burger */}
            <button
              className="bg-gray-100 p-2 rounded-md z-50 relative"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((open) => !open);
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={24} className="text-blue-900" /> : <FiMenu size={24} className="text-blue-900" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown - Updated with backdrop blur and dynamic height */}
      <div
        className={`fixed top-0 right-0 bg-white shadow-lg py-3 md:hidden z-40 w-64 transform transition-transform duration-300 ease-in-out mobile-menu ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ maxHeight: '100vh', overflowY: 'auto' }}
      >
        {/* Close button inside the menu */}
        <div className="flex justify-end px-4 mb-4">
          <button
            className="p-2 text-blue-900"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Menu header with logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} className="h-12" alt="Logo" />
        </div>

        {/* Menu links */}
        <NavLink
          to="/"
          end
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-blue-900 bg-gray-50 text-blue-900 font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <FiHome />
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-blue-900 bg-gray-50 text-blue-900 font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <FiInfo />
          About
        </NavLink>
        <NavLink
          to="/contact"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-blue-900 bg-gray-50 text-blue-900 font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <FiMail />
          Contact
        </NavLink>
        <NavLink
          to="/events"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-blue-900 bg-gray-50 text-blue-900 font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <FaCalendarAlt />
          Events
        </NavLink>

        <NavLink
          to="/gallery"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-blue-900 bg-gray-50 text-blue-900 font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <FiCamera />
          Gallery
        </NavLink>

        <NavLink
          to="/registration"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 border-l-4 ${isActive ? "border-blue-900 bg-gray-50 text-blue-900 font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <FaUserPlus />
          Registration
        </NavLink>

        <div className="px-4 py-3 mt-2">
          <NavLink
            to="/donate"
            onClick={handleLinkClick}
            className="flex items-center gap-2 px-4 py-3 bg-[#C1121F] hover:bg-[#780000] text-white font-medium rounded-md transition-colors w-full justify-center shadow-md"
          >
            <FaHandHoldingHeart />
            Donate
          </NavLink>
        </div>
      </div>

      {/* Backdrop blur overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 md:hidden z-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}

export default Header;