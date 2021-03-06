import Web3 from "web3";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useLocation } from "react-router-dom";

import "./styles/App.css";
import Home from "./screens/Home";
import NFT from "./components/Nft";
import NavBar from "./components/NavBar";
import Comptroller from "./assets/info.json";
import PrivatePool from "./screens/PrivatePool";
import MarketPlace from "./screens/MarketPlace";
import CreatePool from "./components/CreatePool";
import PrivatePools from "./assets/PrivatePool.json";
import TransactionComplete from "./components/TransactionComplete";

const GetComptrollerContract = async (
  web3,
  setComptrollerContract,
  setPrivatePoolContract
) => {
  const ComptrollerContract = await new web3.eth.Contract(
    Comptroller.abi,
    Comptroller.address
  );

  const PrivatePoolContract = await new web3.eth.Contract(
    PrivatePools.abi,
    PrivatePools.address
  );

  setComptrollerContract(ComptrollerContract);
  setPrivatePoolContract(PrivatePoolContract);
};

const App = () => {
  const [screen, setScreen] = useState("home");
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(["Connect Wallet"]);
  const [comptrollerContract, setComptrollerContract] = useState(null);
  const [privatePoolContract, setPrivatePoolContract] = useState(null);

  let location = useLocation();

  const handleConnect = async () => {
    let accounts;
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      accounts = await window.ethereum.enable();
      setAccounts(accounts);
      setWeb3(window.web3);
    } else {
      alert("Install Metamask Extension First");
    }
  };

  useEffect(() => {
    if (web3) {
      GetComptrollerContract(
        web3,
        setComptrollerContract,
        setPrivatePoolContract
      );
    }
  }, [web3]);

  useEffect(() => {
    if (location.pathname === "/") setScreen("home");
    else setScreen(location.pathname.slice(1));
  }, [location]);

  return (
    <div className={`${screen}Bg`}>
      <NavBar handleConnect={handleConnect} accounts={accounts} />
      <Switch>
        <Route exact path="/">
          <Home
            address={accounts[0]}
            web3={web3}
            comptrollerContract={comptrollerContract}
          />
        </Route>
        <Route exact path="/create">
          <CreatePool
            privatePoolContract={privatePoolContract}
            address={accounts[0]}
            web3={web3}
          />
        </Route>
        <Route exact path="/nft">
          <NFT address={accounts[0]} web3={web3} />
        </Route>
        <Route exact path="/marketplace">
          <MarketPlace />
        </Route>
        <Route exact path="/privatepool">
          <PrivatePool
            address={accounts[0]}
            comptrollerContract={comptrollerContract}
            privatePoolContract={privatePoolContract}
            web3={web3}
          />
        </Route>
        <Route exact path="/complete">
          <TransactionComplete />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
