import React from "react";
import "../styles/privatePool.css";
import Graph from "../components/Graph";
import PoolContent from "../components/PoolContent";

const PrivatePool = () => {
  return (
    <div className="privateBody">
      <Graph className="graph" />
      <PoolContent />
    </div>
  );
};
export default PrivatePool;
