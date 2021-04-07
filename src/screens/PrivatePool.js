import React from "react";
import "../styles/privatePool.css";
import Graph from "../components/Graph";
import PoolContent from "../components/PoolContent";
import { useHistory } from "react-router";

const PrivatePool = ({ data }) => {
  const history = useHistory();

  if (data === undefined) {
    history.push("/");
  }

  return data ? (
    <div className="privateBody">
      <Graph className="graph" />
      <PoolContent />
    </div>
  ) : (
    <></>
  );
};
export default PrivatePool;
