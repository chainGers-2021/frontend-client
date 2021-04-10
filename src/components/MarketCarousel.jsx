import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/marketCarousel.css";

import sampleCarousel1 from "../assets/sampleCarousel1.jpg";
import sampleCarousel2 from "../assets/sampleCarousel2.jpg";
import sampleCarousel3 from "../assets/sampleCarousel3.jpg";

const MarketCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="carContain">
          <img
            className="carousel-slide"
            src={sampleCarousel1}
            alt="First slide"
          />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carContain">
          <img
            className="carousel-slide"
            src={sampleCarousel2}
            alt="Second slide"
            width="100%"
          />
        </div>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carContain">
          <img
            className="carousel-slide"
            src={sampleCarousel3}
            alt="Third slide"
            width="100%"
          />
        </div>

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
export default MarketCarousel;
