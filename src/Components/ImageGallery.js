import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch the list of images from the public folder
    fetch('/images')
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'))
          .map((link) => link.href)
          .filter((href) => /\.(png|jpe?g|svg)$/.test(href));

        const loadedImages = links.map((src, index) => ({
          id: index + 1,
          src,
          alt: `Image ${index + 1}`,
        }));

        setImages(loadedImages);
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

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