import React, { useState } from "react";
import "../styles/privatePool.css";
import Graph from "../components/Graph";
import PoolContent from "../components/PoolContent";
import { useHistory } from "react-router";

import LoadingAnimation from "../components/LoadingAnimation";

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

const PrivatePool = ({
  address,
  comptrollerContract,
  privatePoolContract,
  web3,
}) => {
  const [privateKey, setPrivateKey] = useState(null);
  const [loading, setLoading] = useState(false);

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
        const query = {
          query: `
          {
            pool(id: "${data.id}") {
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
            userPools(where: {pool: "${data.id}"}, orderBy: "totalDeposit", orderDirection: desc, first: 5){
              user{
                id
              }
              totalDeposit
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
            let { pool, userPools } = result.data;
            if (pool) {
              pool.top5 = userPools;
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
        if (!data.privatePool || users.indexOf(address) !== -1) {
          DOM = (
            <div className="d-flex flex-column w-100">
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
                  setLoading={setLoading}
                />
              </div>
              <div className="w-50 mx-auto mt-5 text-light">
                <table className="table text-light">
                  <thead>
                    <tr>
                      <th scope="col">Address</th>
                      <th scope="col">Total Deposit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.top5.map((elt, key) => (
                      <tr key={key}>
                        <th scope="row">{elt.user.id}</th>
                        <td>
                          {parseFloat(elt.totalDeposit / 10 ** 18).toFixed(5)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

  return !loading ? DOM : <LoadingAnimation color="white" height="40px" />;
};
export default PrivatePool;
