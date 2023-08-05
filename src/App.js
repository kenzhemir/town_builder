import React, { useEffect, useState } from "react";

import BuildingPatterns from "./Components/BuildingPatterns";
import ConstructionSite from "./Components/ConstructionSite";
import gameloop from "./engine/gameloop";
import { resources } from "./gamedata/resources";
import "./styles/app.scss";

function App() {
  const [info, setInfo] = useState("");
  const [isColorChoiceOn, setIsColorChoiceOn] = useState(false);
  const [sendChoice, setSendChoice] = useState(null);
  useEffect(() => {
    function chooseResource() {
      setIsColorChoiceOn(true);
      return new Promise((resolve) => {
        setSendChoice({ resolve });
      });
    }

    function requestPlacement() {
      return new Promise((res) => setTimeout(() => res({isFinished: false}), 5000));
    }
    gameloop(setInfo, chooseResource, requestPlacement);
  }, []);
  return (
    <div className="App">
      <h1>Town Builder Game</h1>
      <div>
        <BuildingPatterns />
      </div>
      <div>{info}</div>
      {isColorChoiceOn && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendChoice?.resolve(resources[e.target.elements.resource.value]);
          }}
        >
          <input name="resource" />
          <button>Submit</button>
        </form>
      )}
      <div className="gameboards">
        <ConstructionSite />
        <ConstructionSite />
      </div>
    </div>
  );
}

export default App;
