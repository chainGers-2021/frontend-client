import React, { useState } from "react";
import "../styles/privatePool.css";
import Graph from "../components/Graph";
import PoolContent from "../components/PoolContent";
import { useHistory } from "react-router";

const formatData = (data) => {
  data.history = data.history.map((e) => parseInt(e));
  data.timestamps = data.timestamps.map((e) => parseInt(e));
  return data;
};

const PrivatePool = ({
  address,
  comptrollerContract,
  privatePoolContract,
  web3,
}) => {
  const [privateKey, setPrivateKey] = useState(null);
  const history = useHistory();
  const state = history.location.state;
  let DOM = <></>;

  const verify = async (e) => {
    e.preventDefault();
    const data = state.data;
    const message = await web3.utils.randomHex(32);
    const signObject = await web3.eth.accounts.sign(message, privateKey);
    const { messageHash, signature } = signObject;

    await privatePoolContract.methods
      .verifyPoolAccess(data.name, messageHash, signature)
      .send({ from: address })
      .then((tx) => {
        console.log(tx);
        const hashed = web3.utils.keccak256(data.name);
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

        const url =
          "https://api.thegraph.com/subgraphs/name/sksuryan/baby-shark";
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
              pool.name = data.name;
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
      })
      .catch((err) => console.log(err));
  };

  if (state === undefined) {
    history.push("/");
  } else {
    if (address !== "Connect Wallet") {
      const data = state.data;
      if (data === undefined) {
        history.push("/");
      } else {
        let users = data.users;
        users = users.map((elt) => elt.id);
        if (!data.privatePool || users.indexOf(address) !== -1) {
          DOM = (
            <div className="privateBody">
              <Graph
                className="graph"
                xAxis={data.timestamps}
                yAxis={data.history}
              />
              <PoolContent
                data={data}
                address={address}
                web3={web3}
                comptrollerContract={comptrollerContract}
              />
            </div>
          );
        } else {
          DOM = (
            <div className="createPoolDiv">
              <form className="createPoolForm">
                <label>Enter Private Key:</label>
                <input
                  className="privatePoolFields"
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value === "" ? null : value;
                    setPrivateKey(value);
                  }}
                  value={privateKey ? privateKey : ""}
                  placeholder="Private Key"
                  required
                />
                <button className="createBtn" onClick={verify}>
                  Submit
                </button>
              </form>
            </div>
          );
        }
      }
    } else {
      DOM = (
        <div className="createPoolDiv">
          <label>Please Connect Wallet!</label>
        </div>
      );
    }
  }

  return DOM;
};
export default PrivatePool;
