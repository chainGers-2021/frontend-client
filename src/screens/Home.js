import { useEffect, useState } from "react";

import "../styles/Home.css";
import Graph from "../components/Graph";
import PoolContent from "../components/PoolContent";
import Carousel from "react-bootstrap/Carousel";

import LoadingAnimation from "../components/LoadingAnimation";

const formatData = (data) => {
  return data.map((elt) => {
    elt.history = elt.history.map((e) => parseInt(e));
    elt.timestamps = elt.timestamps.map((e) => parseInt(e));
    return elt;
  });
};

const Home = ({ address, comptrollerContract, web3 }) => {
  const [publicPools, setPublicPools] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return !loading ? (
    publicPools && (
      <div className="homeBody">
        <Carousel className="d-flex justify-content-center align-items-center w-100 h-100">
          {publicPools.map((elt, i) => (
            <Carousel.Item key={i}>
              <div className="d-flex w-100 h-100">
                <Graph
                  className="graph"
                  xAxis={elt.timestamps}
                  yAxis={elt.history}
                />
                <PoolContent
                  data={elt}
                  comptrollerContract={comptrollerContract}
                  address={address}
                  web3={web3}
                  setLoading={setLoading}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    )
  ) : (
    <LoadingAnimation color="white" height="40px" />
  );
};

export default Home;
