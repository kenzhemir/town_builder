import React, { useState } from "react";
import BuildingSprite from "./BuildingSprite";
import ResourceSprite from "./ResourceSprite";

const ConstructionSite = ({
  selectedResource,
  selectedBuilding,
  onActionReset,
  sizeX = 4,
  sizeY = 4,
}) => {
  const [table, setTable] = useState(() => {
    return new Array(sizeX)
      .fill(0)
      .map((_, i) =>
        new Array(sizeY)
          .fill(0)
          .map((_, j) => ({ i, j, resource: null, building: null }))
      );
  }, [sizeX, sizeY]);

  const onClickHandler = (cell) => {
    if (selectedResource && !cell.resource) {
      const newTable = structuredClone(table);
      newTable[cell.i][cell.j] = {
        ...cell,
        resource: selectedResource,
      };
      setTable(newTable);
      onActionReset();
    } else if (selectedBuilding && cell.resource) {
      const result = getFittingBlueprint(selectedBuilding, cell, table);
      if (result) {
        const newTable = removeResources(table, result, cell);
        newTable[cell.i][cell.j] = {
          ...cell,
          building: selectedBuilding,
        };
        setTable(newTable);
        onActionReset();
      }
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
                className="cell"
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
    </>
  );
};

export default ConstructionSite;

function removeResources(table, { blueprint, blueprintX, blueprintY }, cell) {
  const newTable = structuredClone(table);
  const tableEdgeX = cell.i - blueprintX;
  const tableEdgeY = cell.j - blueprintY;

  for (let i = 0; i < blueprint.length; i++) {
    for (let j = 0; j < blueprint[0].length; j++) {
      if (blueprint[i][j]) {
        newTable[tableEdgeX + i][tableEdgeY + j].resource = null;
      }
    }
  }

  return newTable;
}

function getFittingBlueprint(building, cell, table) {
  const blueprintsWithResource = building.blueprints.filter((blueprint) =>
    blueprint.some((row) => row.includes(cell.resource.id))
  );
  if (!blueprintsWithResource.length) {
    return null;
  }
  for (const blueprint of blueprintsWithResource) {
    for (let i = 0; i < blueprint.length; i++) {
      for (let j = 0; j < blueprint[i].length; j++) {
        if (!blueprint[i][j]) continue;
        if (blueprint[i][j] === cell.resource.id) {
          if (doesBlueprintFit(table, blueprint, cell, i, j)) {
            return { blueprint, blueprintX: i, blueprintY: j };
          }
        }
      }
    }
  }
  return null;
}

function doesBlueprintFit(table, blueprint, cell, blueprintX, blueprintY) {
  const tableEdgeX = cell.i - blueprintX;
  const tableEdgeY = cell.j - blueprintY;

  if (
    tableEdgeX < 0 ||
    tableEdgeY < 0 ||
    tableEdgeX + blueprint.length > table.length ||
    tableEdgeY + blueprint[0].length > table[0].length
  ) {
    return false;
  }

  for (let i = 0; i < blueprint.length; i++) {
    for (let j = 0; j < blueprint[0].length; j++) {
      if (
        blueprint[i][j] &&
        (!table[tableEdgeX + i][tableEdgeY + j].resource?.id ||
          table[tableEdgeX + i][tableEdgeY + j].resource.id !== blueprint[i][j])
      ) {
        return false;
      }
    }
  }
  return true;
}
