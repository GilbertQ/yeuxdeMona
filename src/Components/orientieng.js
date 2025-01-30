import { useState, useEffect } from "react";
import "./Images.css"; // Ensure you create this CSS file

// Import images
const importAll = (r) => r.keys().map(r);

// Load all images from the "toiles" folder and subfolders
const images = importAll(require.context("./toiles/", true, /\.(jpeg|jpg|png|gif)$/));

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    function handleOrientationChange() {
      if (window.screen.orientation) {
        if (window.screen.orientation.type.startsWith("portrait")) {
          alert("For the best experience, please rotate your device to landscape mode.");
        }
      }
    }

    // Initial check
    handleOrientationChange();

    // Listen for orientation changes
    window.addEventListener("orientationchange", handleOrientationChange);
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener("change", handleOrientationChange);
    }

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      if (window.screen.orientation) {
        window.screen.orientation.removeEventListener("change", handleOrientationChange);
      }
    };
  }, []);

  return (
    <div className="gallery-container">
      {/* Large Main Image */}
      <div className="main-image">
        <img src={selectedImage} alt="Selected Artwork" />
      </div>

      {/* Thumbnail Images */}
      <div className="thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={selectedImage === img ? "active" : ""}
            onClick={() => setSelectedImage(img)}
            title={images[index].slice(images[index].lastIndexOf("/") + 3).split(".")[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
