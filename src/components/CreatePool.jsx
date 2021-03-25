import React from "react";
import "../styles/createPool.css";
import Dropdown from "react-bootstrap/Dropdown";

const CreatePool = () => {
  return (
    <div className="createPoolDiv">
      <form className="createPoolForm">
        <Dropdown>
          <Dropdown.Toggle className="selectTokens" id="dropdown-basic">
            Select Token
          </Dropdown.Toggle>

          <Dropdown.Menu className="super-colors">
            <Dropdown.Item href="#/action-1">LINK</Dropdown.Item>
            <Dropdown.Item href="#/action-2">ETH</Dropdown.Item>
            <Dropdown.Item href="#/action-3">WBTC</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <input placeholder="Pool Name" className="createPoolFields" />
        <br />
        <input placeholder="$" className="currency" readOnly />
        <input type="number" placeholder="Target Price" id="targetPrice" />
        <br />
        <button className="createBtn">Create Pool</button>
      </form>
    </div>
  );
};

export default CreatePool;
