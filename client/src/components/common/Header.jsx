// src/components/common/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import LanguageSelector from './LanguageSelector';
import logo from '../../assets/images/logo.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-purple-900 shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Media Vision Bangalore Logo" className="h-16 w-auto mr-3" />
            <h1 className="text-white text-2xl md:text-3xl font-bold">Media Vision Bangalore</h1>
          </Link>
          
          <div className="flex items-center">
            <LanguageSelector />
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.events'), path: '/events' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.donate'), path: '/donate' },
    { name: t('nav.contact'), path: '/contact' },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="relative">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <NavLink 
            key={link.path} 
            to={link.path}
            className={({ isActive }) => 
              isActive 
                ? "text-white font-medium border-b-2 border-white" 
                : "text-white hover:border-b-2 hover:border-white transition-all duration-200"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-10 right-0 bg-purple-800 rounded-lg shadow-xl p-4 w-48 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `block py-2 px-4 rounded ${isActive ? 'bg-purple-700 text-white' : 'text-white hover:bg-purple-700'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;