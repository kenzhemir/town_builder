import React, { useEffect, useRef } from "react";
import withMouseMove from "../hoc/withMouseMove";
import useComboState from "../hooks/useComboState";
import useConstructionSite from "../hooks/useConstructionSite";
import useSelectionPattern from "../hooks/useSelectionPattern";
import BuildingSprite from "./BuildingSprite";
import BuildingsOffer from "./BuildingsOffer";
import ResourceSelector from "./ResourceSelector";
import ResourceSprite from "./ResourceSprite";

const ConstructionSite = ({ sizeX = 4, sizeY = 4 }) => {
  const { table, placeResource, placeBuilding } = useConstructionSite(
    sizeX,
    sizeY
  );
  const { isCellSelected, toggleCell, mask, resetMask } = useSelectionPattern();
  const {
    isSomethingPickedUp,
    building,
    resource,
    setBuilding,
    setResource,
    reset,
  } = useComboState();

  const ref = useRef(null);
  const MouseAttachedResource = withMouseMove(ResourceSprite);
  const MouseAttachedBuilding = withMouseMove(BuildingSprite);
  useEffect(() => {
    const eventHandler = function (e) {
      e.preventDefault();
      if (isSomethingPickedUp) {
        reset();
      }
    };
    ref.current?.addEventListener("contextmenu", eventHandler);
    return () => {
      ref.current?.removeEventListener("contextmenu", eventHandler);
    };
  }, [isSomethingPickedUp, reset]);

  const onClickHandler = (cell) => {
    if (resource && !cell.resource && !cell.building) {
      placeResource(resource, cell);
      reset();
    } else if (building && isCellSelected(cell)) {
      placeBuilding(building, isCellSelected, cell);
      resetMask();
      reset();
    } else if (!building && !resource && cell.resource) {
      toggleCell(cell);
    }
  };
  return (
    <div className={isSomethingPickedUp ? "cursor-hidden" : ""} ref={ref}>
      {resource && (
        <MouseAttachedResource
          boundsRef={ref}
          name={resource.displayName}
          color={resource.color}
        />
      )}
      {building && (
        <MouseAttachedBuilding boundsRef={ref} building={building} />
      )}
      <p>
        Left click on resource to select. <br />
        Right click on resource to unselect.
      </p>
      <div>
        <ResourceSelector setResource={setResource} />
      </div>
      <div>Resource: {resource && resource.displayName}</div>
      <div>Building: {building && building.displayName}</div>
      <h4>Construction Area</h4>
      <div className="construction-site">
        {table.map((row, i) => (
          <div key={`row-${i}`} className="row">
            {row.map((cell) => (
              <div
                key={`cell-${cell.i}-${cell.j}`}
                className={isCellSelected(cell) ? "cell selected" : "cell"}
                onClick={onClickHandler.bind(null, cell)}
              >
                {cell.resource && (
                  <ResourceSprite
                    color={cell.resource.color}
                    className="construction-block"
                  />
                )}
                {cell.building && (
                  <BuildingSprite
                    building={cell.building}
                    className="construction-block"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <BuildingsOffer mask={mask} setBuilding={setBuilding} />
    </div>
  );
};

export default ConstructionSite;
