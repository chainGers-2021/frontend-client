import React, { useState } from "react";
import "../styles/createPool.css";
import Dropdown from "react-bootstrap/Dropdown";

const CreatePool = ({ createPool }) => {
  const [tokenName, setTokenName] = useState("Select Token");
  const [poolName, setPoolName] = useState("");
  const [targetPrice, setTargetPrice] = useState("");

  return (
    <div className="createPoolDiv">
      <form className="createPoolForm">
        <Dropdown>
          <Dropdown.Toggle className="selectTokens" id="dropdown-basic">
            {tokenName}
          </Dropdown.Toggle>

          <Dropdown.Menu className="super-colors">
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setTokenName("LINK");
              }}>
              LINK
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setTokenName("ETH");
              }}>
              ETH
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setTokenName("WBTC");
              }}>
              WBTC
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <input
          value={poolName}
          placeholder="Pool Name"
          className="createPoolFields"
          onChange={(event) => {
            setPoolName(event.target.value);
          }}
        />
        <br />
        <input placeholder="$" className="currency" readOnly />
        <input
          value={targetPrice}
          placeholder="Target Price"
          id="targetPrice"
          onChange={(event) => {
            setTargetPrice(event.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            createPool(tokenName, poolName, targetPrice);
          }}
          className="createBtn">
          Create Pool
        </button>
      </form>
    </div>
  );
};

export default CreatePool;
