import React, { useState } from "react";
import "../styles/poolContent.css";

const PoolContent = () => {
  const [poolName, setPoolName] = useState("Yoohooo");
  return (
    <div className="poolContent">
      <form className="privatePoolForm">
        <input
          value="LINK"
          placeholder="Token"
          className="privatePoolFields"
          id="tokenName"
          readOnly
        />

        <input
          value={poolName}
          placeholder="Pool Name"
          className="privatePoolFields"
          readOnly
        />
        <input
          value="1000000000000000000000"
          placeholder="Pool Amount"
          className="privatePoolFields"
          id="poolAmount"
          readOnly
        />
        <input placeholder="Target Price" id="privateTargetPrice" />
        <div className="btnGrp">
          <button className="createBtn">Deposit</button>
          <button className="createBtn">Withdraw</button>
        </div>
      </form>
    </div>
  );
};

export default PoolContent;
