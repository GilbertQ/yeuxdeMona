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
  return (
    <div className="gallery-container">
      {/* Large Main Image */}
      <div className="main-image">
        <img src={selectedImage} alt="Selected Artwork" />
      </div>



      {/* Thumbnail Images */}
      <div className="thumbnails">
        {sortedImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={selectedImage === img ? "active" : ""}
            onClick={() => setSelectedImage(img)}
            title={sortedImages[index].slice(sortedImages[index].lastIndexOf("/") + 3).split(".")[0]}
          />
        ))}
        
      </div>
      
    </div>
  );
};

export default ImageGallery;
