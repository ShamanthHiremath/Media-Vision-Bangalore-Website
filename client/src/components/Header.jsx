import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiInfo, FiMail, FiMenu, FiX } from "react-icons/fi";
import { FaHandHoldingHeart, FaCalendarAlt } from "react-icons/fa";
import GoogleTranslate from './GoogleTranslate';
import logo from '../assets/logo1.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when a link is clicked (for better UX)
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-lg relative z-50">
      <div className="container mx-auto px-4">
        {/* Main navigation */}
        <nav className="py-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <img src={logo} className="h-14 md:h-16 mr-3" alt="Logo" />
            <span className="text-2xl font-bold text-[#003049] hidden sm:inline">
              Media Vision
            </span>
          </NavLink>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-[#003049] text-white font-medium" 
                    : "text-[#003049] hover:bg-gray-100"
                }`
              }
            >
              <FiHome />
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-[#003049] text-white font-medium" 
                    : "text-[#003049] hover:bg-gray-100"
                }`
              }
            >
              <FiInfo />
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-[#003049] text-white font-medium" 
                    : "text-[#003049] hover:bg-gray-100"
                }`
              }
            >
              <FiMail />
              Contact
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-[#669BBC] text-white font-medium" 
                    : "text-[#669BBC] hover:bg-gray-100"
                }`
              }
            >
              <FaCalendarAlt />
              Events
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
              className="bg-gray-100 p-2 rounded-md"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={24} className="text-[#003049]" /> : <FiMenu size={24} className="text-[#003049]" />}
            </button>
          </div>
          {/* </button> */}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute left-0 right-0 bg-white shadow-lg py-3 flex flex-col items-stretch md:hidden z-40">
          <NavLink
            to="/"
            end
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 border-l-4 ${
                isActive ? "border-[#003049] bg-gray-50 text-[#003049] font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
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
              `flex items-center gap-2 px-4 py-3 border-l-4 ${
                isActive ? "border-[#003049] bg-gray-50 text-[#003049] font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
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
              `flex items-center gap-2 px-4 py-3 border-l-4 ${
                isActive ? "border-[#003049] bg-gray-50 text-[#003049] font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
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
              `flex items-center gap-2 px-4 py-3 border-l-4 ${
                isActive ? "border-[#669BBC] bg-gray-50 text-[#669BBC] font-medium" : "border-transparent text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <FaCalendarAlt />
            Events
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
      )}
    </header>
  );
}

export default Header;