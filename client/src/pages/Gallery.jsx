import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa';

// Sample gallery data - replace with your API call later
const galleryData = [
  {
    id: 1,
    title: "Annual Fundraising Event 2024",
    date: "March 15, 2024",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000"
    ]
  },
  {
    id: 2,
    title: "Community Outreach Program",
    date: "January 28, 2024",
    images: [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000"
    ]
  },
  {
    id: 3,
    title: "Awareness Workshop",
    date: "February 10, 2024",
    images: [
      "https://images.unsplash.com/photo-1553289038-050c0991871e?q=80&w=1000",
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1000",
      "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1000",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000"
    ]
  },
  {
    id: 4,
    title: "Youth Leadership Summit",
    date: "April 5, 2024",
    images: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000"
    ]
  },
  {
    id: 5,
    title: "Rural Education Drive",
    date: "May 12, 2024",
    images: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000"
    ]
  }
];

const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGallery, setFilteredGallery] = useState(galleryData);

  useEffect(() => {
    // Filter gallery when search term changes
    if (searchTerm.trim() === "") {
      setFilteredGallery(galleryData);
    } else {
      const filtered = galleryData.filter(
        album => album.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGallery(filtered);
    }
  }, [searchTerm]);

  // Open album and show its images
  const openAlbum = (album) => {
    setSelectedAlbum(album);
  };

  // Go back to album list
  const closeAlbum = () => {
    setSelectedAlbum(null);
  };

  // Open image in modal view
  const openImageModal = (imageIndex) => {
    setCurrentImageIndex(imageIndex);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Navigate to next image in modal
  const nextImage = () => {
    if (selectedAlbum) {
      setCurrentImageIndex((currentImageIndex + 1) % selectedAlbum.images.length);
    }
  };

  // Navigate to previous image in modal
  const prevImage = () => {
    if (selectedAlbum) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + selectedAlbum.images.length) % selectedAlbum.images.length
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal, currentImageIndex, selectedAlbum]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Page Header */}
      <div className="relative bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003049]/90 to-[#669BBC]/70"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Media Gallery</h1>
            <p className="text-lg md:text-xl font-light opacity-90">
              Explore images from our events and activities
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search albums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#669BBC] border-none"
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#003049] text-white p-1 rounded-full"
              onClick={() => setSearchTerm("")}
              style={{ visibility: searchTerm ? "visible" : "hidden" }}
            >
              <FaTimes size={12} />
            </button>
          </div>
        </div>

        {selectedAlbum ? (
          <div>
            {/* Album view */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={closeAlbum}
                className="flex items-center gap-2 text-[#003049] hover:text-[#669BBC] transition-colors font-medium"
              >
                <FaChevronLeft /> Back to Albums
              </button>
              <div>
                <h2 className="text-2xl font-bold text-[#003049]">{selectedAlbum.title}</h2>
                <p className="text-sm text-gray-500">{selectedAlbum.date}</p>
              </div>
              <div className="w-24"></div> {/* Empty div for flexbox balance */}
            </div>

            {/* Image grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {selectedAlbum.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => openImageModal(index)}
                >
                  <img
                    src={image}
                    alt={`${selectedAlbum.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transform transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to Enlarge
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div>
            {/* Albums grid */}
            {filteredGallery.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xl text-gray-500">No albums match your search.</p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredGallery.map((album) => (
                  <motion.div
                    key={album.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: album.id * 0.1 }}
                    onClick={() => openAlbum(album)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={album.images[0]}
                        alt={album.title}
                        className="w-full h-full object-cover transform transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-[#003049] mb-1">{album.title}</h3>
                      <p className="text-sm text-gray-500">{album.date}</p>
                      <p className="text-sm text-gray-700 mt-2">{album.images.length} photos</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Full screen image modal */}
      {showModal && selectedAlbum && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors"
            onClick={closeModal}
          >
            <FaTimes size={24} />
          </button>

          {/* Navigation buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors"
            onClick={prevImage}
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors"
            onClick={nextImage}
          >
            <FaChevronRight size={24} />
          </button>

          {/* Image container */}
          <motion.div
            className="w-full h-full flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src={selectedAlbum.images[currentImageIndex]}
              alt={`${selectedAlbum.title} - Image ${currentImageIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain pointer-events-none"
            />
          </motion.div>

          {/* Counter and download button */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
            <div className="bg-black/50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {selectedAlbum.images.length}
            </div>
            <a
              href={selectedAlbum.images[currentImageIndex]}
              download={`media-vision-${selectedAlbum.title}-${currentImageIndex + 1}.jpg`}
              target="_blank"
              rel="noreferrer"
              className="bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaDownload size={18} />
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Gallery;