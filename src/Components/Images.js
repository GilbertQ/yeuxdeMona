import { useState } from "react";
import "./Images.css";

const importAll = (context) => context.keys().map(context);

const importAndSortImages = () => {
  const images = importAll(require.context('./toiles/', true, /\.(jpeg|jpg|png|gif)$/));
  return images.sort((a, b) => {
    const extractFilename = (path) => path.substring(path.lastIndexOf('/') + 1);
    const numA = parseInt(extractFilename(a).substring(0, 2), 10);
    const numB = parseInt(extractFilename(b).substring(0, 2), 10);
    return numA - numB;
  });
};

const sortedImages = importAndSortImages();

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(sortedImages[0]);
  const [startIndex, setStartIndex] = useState(0);
  const maxVisibleThumbnails = 4;

  const handleNext = () => {
    if (startIndex + maxVisibleThumbnails < sortedImages.length) {
      setStartIndex(Math.min(
        startIndex + maxVisibleThumbnails,
        sortedImages.length - maxVisibleThumbnails
      ));
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - maxVisibleThumbnails));
    }
  };

  return (
    <div className="gallery-container">
      {/* Large Main Image */}
      <div className="main-image">
        <img src={selectedImage} alt="Selected Artwork" />
      </div>
      {/* Thumbnail Carousel */}
      <div className="thumbnail-carousel">
        <div className="thumbnails">
          <button 
            onClick={handlePrev} 
            disabled={startIndex === 0} 
            className="nav-button"
            style={{ width: '75px' }}
          >
            &lt;
          </button>
          {sortedImages.slice(startIndex, startIndex + maxVisibleThumbnails).map((img, index) => (
            <img
              key={startIndex + index}
              src={img}
              alt={`Thumbnail ${startIndex + index}`}
              className={selectedImage === img ? "active" : ""}
              onClick={() => setSelectedImage(img)}
              title={img.slice(img.lastIndexOf("/") + 3).split(".")[0]}
            />
          ))}
          <button 
            onClick={handleNext} 
            disabled={startIndex + maxVisibleThumbnails >= sortedImages.length}
            className="nav-button"
            style={{ width: '75px' }}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;