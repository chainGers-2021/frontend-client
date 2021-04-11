import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/navBar.css";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";

const parseDates = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp * 1000);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();

  const string = `${day} / ${month} / ${year} - ${hours}:${minutes.substr(-2)}`;

  return string;
};

const formatData = (elt) => {
  elt.history = elt.history.map((e) => parseFloat(e) / 10 ** 18);
  elt.timestamps = elt.timestamps.map((e) => parseDates(parseInt(e)));
  return elt;
};

const NavBar = ({ handleConnect, accounts }) => {
  const [privatePool, setPrivatePool] = useState(null);
  const history = useHistory();

  const findPrivatePool = () => {
    if (privatePool) {
      const query = {
        query: `
          {
            pool(id: "${privatePool}") {
              id
              symbol
              totalDeposit
              users{
                id
              }
              history
              timestamps
              privatePool
              targetPrice
            }
            userPools(where: {pool: "${privatePool}"}, orderBy: "totalDeposit", orderDirection: desc, first: 5){
              user{
                id
              }
              totalDeposit
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
          let { pool, userPools } = result.data;
          if (pool) {
            pool.top5 = userPools;
            pool = formatData(pool);
            pool.name = privatePool;
            history.push({
              pathname: `/privatepool`,
              state: {
                data: pool,
              },
            });
          } else {
            alert("Pool doesn't exist");
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
        NFTs
      </Link>
      <Link className="options" to="/nft">
        Leaderboard
      </Link>

      {/* <div className="title display-4">AACHAINVESTOR</div> */}

      <div className="searchField">
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
      </div>

      <button onClick={() => handleConnect()} className="connectBtn">
        {accounts[0]}
      </button>
    </div>
  );
};

export default NavBar;
