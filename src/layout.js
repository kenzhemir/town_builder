import React from "react";

import { Outlet } from "react-router";
import BuildingPatterns from "./Components/Buildings/BuildingPatterns";
import "./styles/app.scss";

function Layout() {
  return (
    <div className="App">
      <h1>Town Builder Game</h1>
      <div>
        <BuildingPatterns />
      </div>
      <div className="gameboards">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
