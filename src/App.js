import React from "react";

import BuildingPatterns from "./Components/BuildingPatterns";
import ConstructionSite from "./Components/ConstructionSite";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <h1>Town Builder Game</h1>
      <div>
        <BuildingPatterns />
      </div>
      <div className="gameboards">
        <ConstructionSite />
        <ConstructionSite />
      </div>
    </div>
  );
}

export default App;
