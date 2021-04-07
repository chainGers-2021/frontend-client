import { Link } from "react-router-dom";

import "../styles/navBar.css";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search.png";

const NavBar = ({ handleConnect, accounts }) => {
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
        <Link to="/privatepool">
          <img
            src={searchIcon}
            style={{ width: 20, height: 20 }}
            alt="search icon"
          />
        </Link>
      </div>
      <button onClick={() => handleConnect()} className="connectBtn">
        {accounts[0]}
      </button>
    </div>
  );
};

export default NavBar;
