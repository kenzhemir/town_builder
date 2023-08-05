import React from "react";
import { buildingData } from "../gamedata/buildings";
import withOnSelect from "../hoc/withOnSelect";
import Building from "./Building";

const BuildingSelector = ({ setBuilding }) => {
  const SelectableBuilding = withOnSelect(Building);

  return (
    <>
      {buildingData.map((buildingConf) => (
        <SelectableBuilding
          key={buildingConf.id}
          onSelect={() => setBuilding(buildingConf)}
          building={buildingConf}
        />
      ))}
    </>
  );
};

export default BuildingSelector;
