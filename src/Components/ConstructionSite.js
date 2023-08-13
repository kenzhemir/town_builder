import React from "react";
import { useClearPick, usePickedItemData } from "../contexts/PickContext";
import useConstructionSite from "../hooks/useConstructionSite";
import useSelectionPattern from "../hooks/useSelectionPattern";
import BuildingSprite from "./Buildings/BuildingSprite";
import BuildingsOffer from "./Buildings/BuildingsOffer";
import ResourceSprite from "./Resources/ResourceSprite";

const ConstructionSite = ({ sizeX = 4, sizeY = 4 }) => {
  const { table, placeResource, placeBuilding } = useConstructionSite(
    sizeX,
    sizeY
  );
  const { isCellSelected, toggleCell, mask, resetMask } = useSelectionPattern();

  const resetPickedItem = useClearPick();
  const { resource, building } = usePickedItemData();

  const onClickHandler = (cell) => {
    if (resource && !cell.resource && !cell.building) {
      placeResource(resource, cell);
      resetPickedItem();
    } else if (building && isCellSelected(cell)) {
      placeBuilding(building, isCellSelected, cell);
      resetMask();
      resetPickedItem();
    } else if (!building && !resource && cell.resource) {
      toggleCell(cell);
    }
  };
  return (
    <div>
      <h4>Construction Area</h4>
      <BuildingsOffer mask={mask} />
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
    </div>
  );
};

export default ConstructionSite;
