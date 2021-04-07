import React from "react";
import Particles from "react-particles-js";
import particlesConfig from "../particle-config";
import "../styles/marketPlace.css";

import ProductCard from "../components/ProductCard";
import MarketCarousel from "../components/MarketCarousel";

const MarketPlace = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="carouselContainer">
          <MarketCarousel />
        </div>
      </div>
      <div className="card-grid">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Particles params={particlesConfig} />
    </div>
  );
};

export default MarketPlace;
