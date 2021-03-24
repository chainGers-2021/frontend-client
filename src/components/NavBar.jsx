import React from "react";
import "../App.css";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";
import { Link } from "react-router-dom";
const NavBar = ({ handleCreate, home }) => {
  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="logo navBarElement" />
      <div style={{ margin: 20 }}>
        <Link to="/">HOME</Link>
      </div>
      <div style={{ margin: 20 }}>
        <Link to="/create">CREATE</Link>
      </div>
      <div style={{ margin: 20 }}>
        <Link to="/marketplace">NGOs</Link>
      </div>
      <div className="searchField">
        <input placeholder="Search for pools" />
      </div>
      <div class="searchButton">
        <button>
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
