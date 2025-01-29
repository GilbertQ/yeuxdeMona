import React, { useState } from 'react';
import "./Gallery.css";

// Import your images (adjust the paths according to your folder structure)
import image1 from './toiles/First/01SandroBotticelliVenusyJoven1486.jpeg';
import image2 from './toiles/First/02LeonardodaVinciLaGioconda1519.jpg';
import image3 from './toiles/Second/06FransHalsLaGitana1630.jpg';
import image4 from './toiles/Second/07RembrandtSelfPortraitEasel1660.jpg';

const images = [
  { id: 1, src: image1, alt: 'Image 1' },
  { id: 2, src: image2, alt: 'Image 2' },
  { id: 3, src: image3, alt: 'Image 3' },
  { id: 4, src: image4, alt: 'Image 4' },
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery">
      <div className="thumbnail-container">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="thumbnail"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="full-size-image"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;