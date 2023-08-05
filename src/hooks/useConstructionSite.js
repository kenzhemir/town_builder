import { useState } from "react";

export default function useConstructionSite(sizeX, sizeY) {
  const [table, setTable] = useState(() => {
    return new Array(sizeX)
      .fill(0)
      .map((_, i) =>
        new Array(sizeY)
          .fill(0)
          .map((_, j) => ({ i, j, resource: null, building: null }))
      );
  }, [sizeX, sizeY]);

  function placeResource(resource, cell) {
    const newTable = structuredClone(table);
    newTable[cell.i][cell.j] = {
      ...cell,
      resource,
    };
    setTable(newTable);
  }

  function placeBuilding(building, isCellSelected, cell) {
    const newTable = removeResources(table, isCellSelected);
    newTable[cell.i][cell.j] = {
      ...cell,
      building,
    };
    setTable(newTable);
  }

  return {
    table,
    placeResource,
    placeBuilding,
  };
}

function removeResources(table, isCellSelected) {
  const newTable = structuredClone(table);
  for (let i = 0; i < newTable.length; i++) {
    for (let j = 0; j < newTable[0].length; j++) {
      if (isCellSelected(newTable[i][j])) {
        newTable[i][j].resource = null;
      }
    }
  }

  return newTable;
}
