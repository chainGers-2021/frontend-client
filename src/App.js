import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import CreatePool from "./components/CreatePool";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./screens/Home";
import MarketPlace from "./screens/MarketPlace";
import { Switch, Route, useLocation } from "react-router-dom";

const App = () => {
  const [screen, setScreen] = useState("home");
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") setScreen("home");
    else setScreen(location.pathname.slice(1));
  }, [location]);
  return (
    <div className={`${screen}Bg`}>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/create">
          <CreatePool />
        </Route>
        <Route exact path="/marketplace">
          <MarketPlace />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
