import React, { useEffect } from "react";

import BuildingSelector from "./Components/BuildingSelector";
import BuildingSprite from "./Components/BuildingSprite";
import ConstructionSite from "./Components/ConstructionSite";
import ResourceSelector from "./Components/ResourceSelector";
import ResourceSprite from "./Components/ResourceSprite";
import withMouseMove from "./hoc/withMouseMove";
import useComboState from "./hooks/useComboState";
import "./styles/app.scss";

function App() {
  const {
    isSomethingPickedUp,
    building,
    resource,
    setBuilding,
    setResource,
    reset,
  } = useComboState();

  const MouseAttachedResource = withMouseMove(ResourceSprite);
  const MouseAttachedBuilding = withMouseMove(BuildingSprite);
  useEffect(() => {
    const eventHandler = function (e) {
      if (isSomethingPickedUp) {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener("contextmenu", eventHandler);
    return () => {
      window.removeEventListener("contextmenu", eventHandler);
    };
  }, [isSomethingPickedUp, reset]);

  return (
    <div className={"App" + (isSomethingPickedUp ? " cursor-hidden" : "")}>
      {resource && (
        <MouseAttachedResource
          name={resource.displayName}
          color={resource.color}
        />
      )}
      {building && <MouseAttachedBuilding building={building} />}

      <p>Left click on resource to select.</p>
      <p>Right click on resource to unselect.</p>
      <div>
        <ResourceSelector setResource={setResource} />
      </div>
      <div>
        <BuildingSelector setBuilding={setBuilding} />
      </div>
      <div>Resource: {resource && resource.displayName}</div>
      <div>Building: {building && building.displayName}</div>
      <ConstructionSite
        selectedResource={resource}
        selectedBuilding={building}
        onActionReset={reset}
      />
    </div>
  );
}

export default App;
