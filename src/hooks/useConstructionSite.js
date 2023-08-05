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
    const newTable = structuredClone(table);
    newTable[cell.i][cell.j] = {
      ...cell,
      building,
    };
    removeResources(newTable, isCellSelected);
    setTable(newTable);
  }

  return {
    table,
    placeResource,
    placeBuilding,
  };
}

function removeResources(table, isCellSelected) {
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      if (isCellSelected(table[i][j])) {
        table[i][j].resource = null;
      }
    }
  }
}
