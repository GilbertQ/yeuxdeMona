import { useState } from "react";
import "./Images.css"; // Ensure you create this CSS file

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
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
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
        <button onClick={handlePrev} disabled={startIndex === 0}>&lt;</button>
        <button onClick={handleNext} disabled={startIndex + maxVisibleThumbnails >= sortedImages.length}>&gt;</button>
        <div className="thumbnails">
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
        </div>

      </div>
    </div>
  );
};

export default ImageGallery;
