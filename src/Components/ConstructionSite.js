import React from "react";
import useConstructionSite from "../hooks/useConstructionSite";
import useSelectionPattern from "../hooks/useSelectionPattern";
import BuildingSprite from "./BuildingSprite";
import BuildingsOffer from "./BuildingsOffer";
import ResourceSprite from "./ResourceSprite";

const ConstructionSite = ({
  selectedResource,
  selectedBuilding,
  onActionReset,
  setBuilding,
  sizeX = 4,
  sizeY = 4,
}) => {
  const { table, placeResource, placeBuilding } = useConstructionSite(
    sizeX,
    sizeY
  );

  const { isCellSelected, toggleCell, mask, resetMask } = useSelectionPattern();

  const onClickHandler = (cell) => {
    if (selectedResource && !cell.resource) {
      placeResource(selectedResource, cell);
      onActionReset();
    } else if (selectedBuilding && cell.resource) {
      placeBuilding(selectedBuilding, isCellSelected, cell);
      resetMask();
      onActionReset();
    } else if (cell.resource) {
      toggleCell(cell);
    }
  };

  return (
    <>
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
    </>
  );
};

export default ConstructionSite;
