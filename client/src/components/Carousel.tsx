import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { StyledImage, StyledSlide } from "./components_style/carousel_styled";

interface CarouselItem {
  imageUrl: string;
  caption: string;
}

interface MyCarouselProps {
  items: CarouselItem[];
}

const MyCarousel: React.FC<MyCarouselProps> = ({ items }) => {
  return (
    <Carousel>
      {items.map((item, index) => (
        <StyledSlide key={index}>
          <StyledImage src={item.imageUrl} alt={item.caption} />
        </StyledSlide>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
