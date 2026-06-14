import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { getCloudinaryUrl } from '../utils/cloudinaryUrl';

const TeamMemberCard = ({ member }) => {
  const [showModal, setShowModal] = useState(false);

  const optimizedThumb = getCloudinaryUrl(member.image, { width: 400 });
  const optimizedFull  = getCloudinaryUrl(member.image, { width: 700 });

  return (
    <>
      <motion.div
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row cursor-pointer border border-gray-100"
        whileHover={{ y: -2 }}
        onClick={() => setShowModal(true)}
      >
        {/* Square thumbnail */}
        <div className="sm:w-48 flex-shrink-0 bg-gray-100 aspect-square sm:aspect-auto">
          <img
            src={optimizedThumb}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover object-center"
            onError={e => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Info */}
        <div className="p-6 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-amber-900 mb-1">{member.name}</h3>
          <p className="text-amber-700 font-medium mb-3">{member.position}</p>
          <p className="text-gray-600 text-sm line-clamp-3">{member.description}</p>
          <span className="mt-4 text-amber-700 text-sm font-medium hover:underline inline-block">
            View Profile →
          </span>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative bg-white rounded-xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 bg-white/90 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-full z-10 shadow"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <FaTimes size={18} />
              </button>

              <div className="flex-shrink-0 w-full md:w-72 aspect-square bg-gray-100">
                <img
                  src={optimizedFull}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div className="flex-1 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-amber-900 mb-1">{member.name}</h3>
                <p className="text-amber-700 font-semibold text-lg mb-4">{member.position}</p>
                <p className="text-gray-700 leading-relaxed">{member.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamMemberCard;
