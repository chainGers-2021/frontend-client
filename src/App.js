import React from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import graph from "./assets/sampleGraph.png";

const App = () => {
  return (
    <div className="desktop">
      <NavBar />
      <button className="arrowLeftBtn">
        <FaAngleLeft style={{ color: "#79D2E5", fontSize: 20 }} />
      </button>
      <img src={graph} className="graph" />
      <div className="poolContent">Woohooo</div>
      <button className="arrowRightBtn">
        <FaAngleRight style={{ color: "#79D2E5", fontSize: 20 }} />
      </button>
    </div>
  );
};
export default App;
