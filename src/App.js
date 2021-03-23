import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import CreatePool from "./components/CreatePool";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./screens/Home";
import { Switch, Route, useLocation } from "react-router-dom";

const App = () => {
  const [screen, setScreen] = useState("home");
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") setScreen("home");
    else setScreen(location.pathname.slice(1));
  }, [location]);

  // return home ? (
  //   <div className="homeBg">
  //     <NavBar handleCreate={handleCreate} home={home} />
  //     <button className="arrowLeftBtn">
  //       <FaAngleLeft style={{ color: "#79D2E5", fontSize: 20 }} />
  //     </button>
  //     <img src={graph} className="graph" alt="sampleGraph" />
  //     <PoolContent />
  //     <button className="arrowRightBtn">
  //       <FaAngleRight style={{ color: "#79D2E5", fontSize: 20 }} />
  //     </button>
  //   </div>
  // ) : (
  //   <div className="createBg">
  //     <NavBar handleCreate={handleCreate} home={home} />
  //     <CreatePool />
  //   </div>
  // );
  // return (
  //   <div className="createBg">
  //     <NavBar handleCreate={handleCreate} home={home} />
  //     <div>
  //       <a href="http://www.freepik.com">Designed by kjpargeter / Freepik</a>
  //     </div>
  //   </div>
  // );
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
      </Switch>
    </div>
  );
};
export default App;
