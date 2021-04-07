import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "../styles/Home.css";
import Graph from "../components/Graph";
import PoolContent from "../components/PoolContent";

const formatData = (data) => {
  return data.map((elt) => {
    elt.history = elt.history.map((e) => parseInt(e));
    elt.timestamps = elt.timestamps.map((e) => parseInt(e));
    return elt;
  });
};

const Home = ({ address, comptrollerContract, ERC20 }) => {
  const [publicPools, setPublicPools] = useState(null);

  useEffect(() => {
    const query = {
      query: `
        {
          pools(where: {privatePool: false}) {
            id
            owner
            history
            timestamps
            totalDeposit
            symbol
            privatePool
          }
        }`,
    };

    const url = "https://api.thegraph.com/subgraphs/name/sksuryan/baby-shark";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(query),
    };

    fetch(url, options)
      .then((data) => data.json())
      .then((result) => setPublicPools(formatData(result.data.pools)))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    publicPools && (
      <div className="homeBody">
        <button className="arrowLeftBtn">
          <FaAngleLeft style={{ color: "#79D2E5", fontSize: 20 }} />
        </button>
        <Graph
          className="graph"
          xAxis={publicPools[0].timestamps}
          yAxis={publicPools[0].history}
        />
        <PoolContent
          data={publicPools[0]}
          comptrollerContract={comptrollerContract}
          address={address}
          ERC20={ERC20}
        />
        <button className="arrowRightBtn">
          <FaAngleRight style={{ color: "#79D2E5", fontSize: 20 }} />
        </button>
      </div>
    )
  );
};

export default Home;
