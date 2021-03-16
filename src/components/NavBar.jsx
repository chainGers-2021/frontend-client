import React from "react";
import "../App.css";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";
const NavBar = () => {
  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="logo navBarElement" />
      <div style={{ margin: 20 }}>
        <a href="https://www.google.com">CREATE</a>
      </div>
      <div style={{ margin: 20 }}>
        <a href="https://www.google.com">NGOs</a>
      </div>
      <div>
        <input placeholder="Search for pools" className="searchField" />
      </div>
      <div>
        <button class="searchButton">
          <img
            src={searchIcon}
            style={{ width: 20, height: 20 }}
            alt="search icon"
          />
        </button>
      </div>
      <div>
        <button className="connectBtn">Connect Wallet</button>
      </div>
    </div>
  );
};

export default NavBar;
