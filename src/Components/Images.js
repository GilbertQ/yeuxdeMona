import { useState } from "react";
import "./Images.css"; // Ensure you create this CSS file

// Import images
const importAll = (r) => r.keys().map(r);

// Load all images from the "toiles" folder and subfolders
const images = importAll(require.context("./toiles/", true, /\.(jpeg|jpg|png|gif)$/));

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

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
