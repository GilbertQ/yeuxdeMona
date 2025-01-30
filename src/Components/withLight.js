import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import "./Images.css"; // Ensure you create this CSS file

// Import images
const importAll = (r) => r.keys().map(r);

// Load all images from the "toiles" folder and subfolders
const images = importAll(require.context("./toiles/", true, /\.(jpeg|jpg|png|gif)$/));


const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          setIsLightboxOpen(false);
          break;
        case 'ArrowLeft':
          navigateImages('prev');
          break;
        case 'ArrowRight':
          navigateImages('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedImage]);

  const navigateImages = (direction) => {
    const currentIndex = images.indexOf(selectedImage);
    if (direction === 'next') {
      setSelectedImage(images[(currentIndex + 1) % images.length]);
    } else {
      setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
    }
  };

  const handleImageClick = () => {
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      setIsLightboxOpen(true);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Main Image */}
      <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={selectedImage.url}
          alt={selectedImage.title || 'Selected Artwork'}
          className={`w-full h-[500px] object-contain cursor-zoom-in transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={handleImageClick}
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {images.map((img, index) => (
          <button
            key={index}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === img
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.url}
              alt={img.title || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={() => navigateImages('prev')}
            className="absolute left-4 text-white hover:text-gray-300 p-2"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={selectedImage.url}
            alt={selectedImage.title || 'Selected Artwork'}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={() => navigateImages('next')}
            className="absolute right-4 text-white hover:text-gray-300 p-2"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;