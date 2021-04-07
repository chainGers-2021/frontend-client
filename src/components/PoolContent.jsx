import { useState } from "react";
import "../styles/poolContent.css";

const toWei = (x) => {
  return (x * 10 ** 18).toString();
};

const PoolContent = ({ address, comptrollerContract, data, ERC20 }) => {
  const [amount, setAmount] = useState(null);
  const deposit = async (e) => {
    e.preventDefault();
    if (comptrollerContract) {
      await ERC20.methods
        .approve(comptrollerContract._address, toWei(0.5))
        .send({ from: address })
        .then(async (tx) => {
          await comptrollerContract.methods
            .depositERC20(
              data.name,
              toWei(amount),
              data.symbol,
              data.privatePool
            )
            .send({ from: address })
            .then((tx) => console.log(tx))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const withdrawal = async (e) => {
    e.preventDefault();

    if (comptrollerContract) {
      await comptrollerContract.methods
        .withdrawERC20(data.name, toWei(amount), data.privatePool)
        .then((tx) => console.log(tx))
        .catch((err) => console.log(err));
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
          value={data.name}
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
