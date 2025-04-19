// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import logo from '../../assets/images/logo.jpg';
import facebookIcon from '../../assets/icons/facebook.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import websiteIcon from '../../assets/icons/website.svg';

const Footer = () => {
  const { t } = useTranslation();
  
  const socialLinks = [
    { name: 'Facebook', icon: facebookIcon, url: 'https://facebook.com/mediavisionbangalore' },
    { name: 'Instagram', icon: instagramIcon, url: 'https://instagram.com/mediavisionbangalore' },
    { name: 'YouTube', icon: youtubeIcon, url: 'https://youtube.com/mediavisionbangalore' },
    { name: 'Website', icon: websiteIcon, url: 'https://mediavisionbangalore.org' },
  ];
  
  const quickLinks = [
    { name: t('footer.home'), path: '/' },
    { name: t('footer.about'), path: '/about' },
    { name: t('footer.achievements'), path: '/achievements' },
    { name: t('footer.events'), path: '/events' },
    { name: t('footer.contact'), path: '/contact' },
    { name: t('footer.donate'), path: '/donate' },
  ];
  
  return (
    <footer className="bg-purple-900 text-white pt-12 pb-6 border-t border-purple-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Media Vision Bangalore Logo" className="h-12 w-auto mr-3" />
              <div>
                <h3 className="text-xl font-bold">Media Vision</h3>
                <p className="text-sm text-gray-300">Bangalore</p>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-purple-800 p-2 rounded-full hover:bg-purple-700 transition-colors"
                  aria-label={link.name}
                >
                  <img src={link.icon} alt={link.name} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-purple-700 pb-2">
              {t('footer.quickLinks')}
            </h3>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path} className="mb-2">
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-purple-700 pb-2">
              {t('footer.contact')}
            </h3>
            <ul>
              <li className="mb-2 flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@mediavisionbangalore.org</span>
              </li>
              <li className="mb-2 flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 80123 45678</span>
              </li>
              <li className="mb-2 flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 MG Road, Bangalore, Karnataka, India</span>
              </li>
            </ul>
          </div>
          
          {/* Location Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-purple-700 pb-2">
              {t('footer.locationMap')}
            </h3>
            <div className="bg-gray-700 rounded-lg h-40 overflow-hidden">
              <a 
                href="https://maps.google.com/?q=MG+Road+Bangalore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full w-full"
              >
                <img 
                  src="/api/placeholder/400/320" 
                  alt="Map location" 
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-purple-800 text-sm text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Media Vision Bangalore. 
            {t('footer.rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;