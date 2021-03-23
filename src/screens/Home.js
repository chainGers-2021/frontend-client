import React from "react";
import "../App.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import graph from "../assets/sampleGraph.png";
import PoolContent from "../components/PoolContent";

const Home = () => {
  return (
    <>
      <button className="arrowLeftBtn">
        <FaAngleLeft style={{ color: "#79D2E5", fontSize: 20 }} />
      </button>
      <img src={graph} className="graph" alt="sampleGraph" />
      <PoolContent />
      <button className="arrowRightBtn">
        <FaAngleRight style={{ color: "#79D2E5", fontSize: 20 }} />
      </button>
    </>
  );
};

export default Home;
