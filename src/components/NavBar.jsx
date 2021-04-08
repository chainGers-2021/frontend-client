import Web3 from "web3";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/navBar.css";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";

const formatData = (data) => {
  data.history = data.history.map((e) => parseInt(e));
  data.timestamps = data.timestamps.map((e) => parseInt(e));
  return data;
};

const NavBar = ({ handleConnect, accounts }) => {
  const [privatePool, setPrivatePool] = useState(null);
  const history = useHistory();

  const findPrivatePool = () => {
    if (privatePool) {
      const hashed = Web3.utils.keccak256(privatePool);
      const query = {
        query: `
          {
            pool(id: "${hashed}") {
              id
              symbol
              totalDeposit
              users{
                id
              }
              history
              timestamps
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
        .then(async (result) => {
          let { pool } = result.data;
          if (pool) {
            pool = formatData(pool);
            pool.name = privatePool;
            history.push({
              pathname: `/privatepool`,
              state: {
                data: pool,
              },
            });
          } else {
            console.log("Pool doesn't exists");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="logo navBarElement" />
      <Link className="options" to="/">
        HOME
      </Link>
      <Link className="options" to="/create">
        CREATE
      </Link>
      <Link className="options" to="/marketplace">
        NGOs
      </Link>

      <div className="title display-4">
        AACHAINVESTOR
      </div>

      {/* <div className="searchField">
        <input
          placeholder="Enter Private Pool Name"
          value={privatePool ? privatePool : ""}
          onChange={(e) => setPrivatePool(e.target.value)}
        />

        <div class="searchButton">
          <button onClick={findPrivatePool}>
            <img
              src={searchIcon}
              style={{ width: 20, height: 20 }}
              alt="search icon"
            />
          </button>
        </div>
      </div> */}

      <button onClick={() => handleConnect()} className="connectBtn">
        {accounts[0]}
      </button>
    </div>
  );
};

export default NavBar;
