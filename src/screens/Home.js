import React from "react";
import "../styles/Home.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Graph from "../components/Graph";
import PoolContent from "../components/PoolContent";

const Home = () => {
  return (
    <div className="homeBody">
      <button className="arrowLeftBtn">
        <FaAngleLeft style={{ color: "#79D2E5", fontSize: 20 }} />
      </button>
      <Graph className="graph" />
      <PoolContent />
      <button className="arrowRightBtn">
        <FaAngleRight style={{ color: "#79D2E5", fontSize: 20 }} />
      </button>
    </div>
  );
};

export default Home;
