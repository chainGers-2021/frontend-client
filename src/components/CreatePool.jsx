import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";

import "../styles/createPool.css";
import LoadingAnimation from "./LoadingAnimation";

const CreatePool = ({ web3, address, privatePoolContract }) => {
  const [tokens, setTokens] = useState([]);
  const [message, setMessage] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [poolName, setPoolName] = useState(null);
  const [targetPrice, setTargetPrice] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = {
      query: `
        {
          tokens {
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
      .then((res) => res.json())
      .then((data) => setTokens(data.data.tokens))
      .catch((err) => console.log(err));
  }, []);

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
            const details = [
              {
                key: "Private Key",
                value: account.privateKey,
              },
            ];

            privatePoolContract.methods
              .createPool(tokenName, poolName, targetPrice, account.address)
              .send({ from: address })
              .then((tx) => {
                setLoading(false);
                history.push({
                  pathname: "/complete",
                  state: {
                    response: tx,
                    details,
                    newPool: true,
                  },
                });
              })
              .catch((err) => {
                setLoading(false);
                history.push({
                  pathname: "/complete",
                  state: {
                    response: { ...err, status: false, from: address },
                    details,
                  },
                });
              });
            setLoading(true);
          } else {
            setMessage("Pool already exists.");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          }
        })
        .catch((error) => console.log("error", error));
    } else if (!web3) {
      setMessage("Connect Wallet.");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      setMessage("Please fill required fields.");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return !loading ? (
    <div className="createPoolDiv position-relative">
      <form className="createPoolForm">
        <Dropdown>
          <Dropdown.Toggle className="selectTokens" id="dropdown-basic">
            {tokenName ? tokenName : "Select"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            {tokens.map((elt, key) => (
              <Dropdown.Item
                as="button"
                onClick={(e) => {
                  e.preventDefault();
                  setTokenName(elt.id);
                }}
                key={key}
              >
                {elt.id}
              </Dropdown.Item>
            ))}
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

        <div className="priceShower">
          <input placeholder="USD" className="currency" readOnly />

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
        </div>
        <button onClick={createPool} className="btn btn-sm createBtn">
          Create Pool
        </button>
      </form>
      {message && (
        <div
          class="alert alert-danger mt-3 position-absolute fixed-bottom w-50"
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  ) : (
    <LoadingAnimation height="40px" color="white" />
  );
};

export default CreatePool;
