import { useState } from "react";
import OZ from "@openzeppelin/contracts/build/contracts/ERC20.json";

import "../styles/poolContent.css";
import { useHistory } from "react-router";

const toWei = (x) => {
  return (x * 10 ** 18).toString();
};

const initializeERC20 = async (web3, symbol) => {
  const query = {
    query: `
      {
        token(id: "${symbol}") {
          address
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

  const res = await fetch(url, options);
  const data = await res.json();
  const ERC20 = await new web3.eth.Contract(OZ.abi, data.data.token.address);
  return ERC20;
};

const PoolContent = ({
  address,
  comptrollerContract,
  data,
  web3,
  setLoading,
}) => {
  const [amount, setAmount] = useState(null);
  const history = useHistory();

  const deposit = async (e) => {
    e.preventDefault();
    if (comptrollerContract) {
      setLoading(true);
      const ERC20 = await initializeERC20(web3, data.symbol);
      ERC20.methods
        .approve(comptrollerContract._address, toWei(amount))
        .send({ from: address })
        .then((tx) => {
          comptrollerContract.methods
            .depositERC20(data.id, toWei(amount), data.privatePool)
            .send({ from: address })
            .then((tx) => {
              setLoading(false);
              const details = [
                {
                  key: "Deposit",
                  value: `${amount} ${data.symbol}`,
                },
              ];
              history.push({
                pathname: "/complete",
                state: {
                  response: tx,
                  details,
                },
              });
            })
            .catch((err) => {
              setLoading(false);
              const details = [
                {
                  key: "Deposit",
                  value: `${amount} ${data.symbol}`,
                },
              ];
              history.push({
                pathname: "/complete",
                state: {
                  response: { ...err, status: false, from: address },
                  details,
                  newPool: false,
                },
              });
            });
        })
        .catch((err) => {
          setLoading(false);
          const details = [
            {
              key: "Deposit",
              value: `${amount} ${data.symbol}`,
            },
          ];
          history.push({
            pathname: "/complete",
            state: {
              response: { ...err, status: false, from: address },
              details,
            },
          });
        });
    }
  };

  const withdrawal = (e) => {
    e.preventDefault();
    if (comptrollerContract) {
      setLoading(true);
      comptrollerContract.methods
        .withdrawERC20(data.id, toWei(amount), data.privatePool)
        .send({ from: address })
        .then((tx) => {
          setLoading(false);
          const details = [
            {
              key: "Withdrawal",
              value: `${amount} ${data.symbol}`,
            },
          ];
          history.push({
            pathname: "/complete",
            state: {
              response: tx,
              newPool: false,
              details,
            },
          });
        })
        .catch((err) => {
          setLoading(false);
          const details = [
            {
              key: "Deposit",
              value: `${amount} ${data.symbol}`,
            },
          ];
          history.push({
            pathname: "/complete",
            state: {
              response: { ...err, status: false, from: address },
              details,
            },
          });
        });
    }
  };

  return (
    <div className="poolContent">
      <form className="privatePoolForm">
        <input
          value={data.symbol}
          placeholder="Token"
          className="privatePoolFields"
          id="tokenName"
          readOnly
        />
        <input
          value={data.id}
          placeholder="Pool Name"
          className="privatePoolFields"
          readOnly
        />
        <input
          value={data.totalDeposit}
          placeholder="Pool Amount"
          className="privatePoolFields"
          id="poolAmount"
          readOnly
        />
        <input
          placeholder="Amount"
          id="privateTargetPrice"
          value={amount ? amount : ""}
          onChange={(e) => {
            let { value } = e.target;
            value = value === "" ? null : value;
            setAmount(value);
          }}
          type="number"
        />
        <div className="btnGrp">
          <button className="createBtn" onClick={deposit}>
            Deposit
          </button>
          <button className="createBtn" onClick={withdrawal}>
            Withdraw
          </button>
        </div>
      </form>
    </div>
  );
};

export default PoolContent;
