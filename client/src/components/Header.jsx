import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiInfo, FiMail, FiMenu, FiX } from "react-icons/fi";
import GoogleTranslate from './GoogleTranslate';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when a link is clicked (for better UX)
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow-md relative z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-gray-800">
          Your Logo
        </NavLink>
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <FiHome />
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <FiInfo />
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <FiMail />
            Contact
          </NavLink>
        </div>
        {/* Google Translate Button */}
        <div className="ml-4 flex items-center space-x-2 border border-gray-200 rounded px-2 py-1 bg-gray-50 hover:shadow transition-shadow">
          <span
            className="text-sm text-blue-600 font-semibold cursor-pointer inline mr-1 hover:underline"
            onClick={() => {
              let attempts = 0;
              const tryOpenDropdown = () => {
                const combo = document.querySelector('.goog-te-combo');
                if (combo) {
                  combo.focus();
                  // Try to open with click
                  combo.click();
                  // Try to open with keyboard event
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

        {/* Mobile Burger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute left-0 right-0 mx-4 mt-2 bg-white shadow-lg rounded-b-lg py-4 flex flex-col items-center space-y-4 md:hidden z-40">
          <NavLink
            to="/"
            end
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-2 rounded ${
                isActive ? "text-blue-600 font-bold bg-blue-50" : "text-gray-600 hover:text-gray-900"
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
              `flex items-center gap-2 px-2 py-2 rounded ${
                isActive ? "text-blue-600 font-bold bg-blue-50" : "text-gray-600 hover:text-gray-900"
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
              `flex items-center gap-2 px-2 py-2 rounded ${
                isActive ? "text-blue-600 font-bold bg-blue-50" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <FiMail />
            Contact
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header; 