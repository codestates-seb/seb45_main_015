import React, { useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return images.map((_, index) => (
      <span
        key={index}
        className={`dot ${currentIndex === index ? "active" : ""}`}
        onClick={() => handleDotClick(index)}
      ></span>
    ));
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="image-wrapper">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`이미지 ${index + 1}`}
              className={`slide ${currentIndex === index ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="dots">{renderDots()}</div>
    </div>
  );
};

export default Carousel;
