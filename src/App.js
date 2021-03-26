import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import "./styles/App.css";
import CreatePool from "./components/CreatePool";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./screens/Home";
import MarketPlace from "./screens/MarketPlace";
import { Switch, Route, useLocation } from "react-router-dom";
// import Web3 from "web3";

const App = () => {
  const [screen, setScreen] = useState("home");
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(["Connect Wallet"]);

  let location = useLocation();
  const handleConnect = async () => {
    let x;
    try {
      x = await window.web3.currentProvider.enable();
    } catch (error) {
      console.log(error);
    }
    setAccounts(x);
    setWeb3(window.web3);
    console.log("State accounts:", accounts);
  };

  const createPool = async (tokenName, poolName, targetPrice) => {
    // Set state to loading
    console.log(tokenName);
    console.log(poolName);
    console.log(targetPrice);

    await new Promise((r) => setTimeout(r, 5000));

    // Two transactions
    // 20 seconds.
    // import info.json
    // Create factory instance
    // call createPool()
    // let newAccount = await web3.eth.accounts.create();
    // await factoryV2.methods
    //   .createPool("LINK", "TEST", 50, newAccount.address)
    //   .send({ from: admin });

    // Set state to unloading + redirect to transaction page with argument tx()+args
  };

  useEffect(() => {
    if (location.pathname === "/") setScreen("home");
    else setScreen(location.pathname.slice(1));
  }, [location]);

  return (
    <div className={`${screen}Bg`}>
      <NavBar handleConnect={handleConnect} accounts={accounts} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/create">
          <CreatePool createPool={createPool} />
        </Route>
        <Route exact path="/marketplace">
          <MarketPlace />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
