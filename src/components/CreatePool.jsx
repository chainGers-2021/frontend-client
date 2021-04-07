import Web3 from "web3";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import "../styles/createPool.css";

const CreatePool = ({ web3, address, privatePoolContract }) => {
  const [tokenName, setTokenName] = useState(null);
  const [poolName, setPoolName] = useState(null);
  const [targetPrice, setTargetPrice] = useState(null);

  const createPool = (e) => {
    e.preventDefault();

    if (web3 && tokenName && poolName && targetPrice) {
      const hashed = Web3.utils.keccak256(poolName).toString();

      const query = {
        query: `
          {
            pool(id: "${hashed}") {
              id
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
          if (!result.data.pool) {
            const account = await web3.eth.accounts.create();
            console.log(account.address, account.privateKey);

            privatePoolContract.methods
              .createPool(tokenName, poolName, targetPrice, account.address)
              .send({ from: address })
              .then((tx) => console.log(tx))
              .catch((err) => console.log(err));
          } else {
            console.log("Pool already exists");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="createPoolDiv">
      <form className="createPoolForm">
        <Dropdown>
          <Dropdown.Toggle className="selectTokens" id="dropdown-basic">
            {tokenName ? tokenName : "Select Token"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setTokenName("LINK");
              }}
            >
              LINK
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setTokenName("ETH");
              }}
            >
              ETH
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setTokenName("WBTC");
              }}
            >
              WBTC
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <input
          value={poolName ? poolName : ""}
          placeholder="Pool Name"
          className="createPoolFields"
          onChange={(event) => {
            let { value } = event.target;
            value = value === "" ? null : value;
            setPoolName(value);
          }}
        />
        <br />
        <input placeholder="$" className="currency" readOnly />
        <input
          value={targetPrice ? targetPrice : ""}
          placeholder="Target Price"
          id="targetPrice"
          onChange={(event) => {
            let { value } = event.target;
            value = parseInt(value) <= 0 ? null : parseInt(value);
            setTargetPrice(value);
          }}
          type="number"
        />
        <br />
        <button onClick={createPool} className="createBtn">
          Create Pool
        </button>
      </form>
    </div>
  );
};

export default CreatePool;
