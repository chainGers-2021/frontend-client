import React, { useState } from "react";
import NavBar from "./components/NavBar";
import PoolContent from "./components/PoolContent";
import "./App.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import graph from "./assets/sampleGraph.png";
import CreatePool from "./components/CreatePool";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [home, setHome] = useState(true);

  const handleCreate = () => {
    console.log(home);
    home ? setHome(false) : setHome(true);
  };

  // return home ? (
  //   <div className="homeBg">
  //     <NavBar handleCreate={handleCreate} home={home} />
  //     <button className="arrowLeftBtn">
  //       <FaAngleLeft style={{ color: "#79D2E5", fontSize: 20 }} />
  //     </button>
  //     <img src={graph} className="graph" alt="sampleGraph" />
  //     <PoolContent />
  //     <button className="arrowRightBtn">
  //       <FaAngleRight style={{ color: "#79D2E5", fontSize: 20 }} />
  //     </button>
  //   </div>
  // ) : (
  //   <div className="createBg">
  //     <NavBar handleCreate={handleCreate} home={home} />
  //     <CreatePool />
  //   </div>
  // );
  return (
    <div className="createBg">
      <NavBar handleCreate={handleCreate} home={home} />
      <div>
        <a href="http://www.freepik.com">Designed by kjpargeter / Freepik</a>
      </div>
    </div>
  );
};
export default App;
