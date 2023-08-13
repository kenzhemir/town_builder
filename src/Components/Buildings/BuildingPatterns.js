import React from "react";
import { buildingData } from "../../gamedata/buildings";
import Building from "./Building";

const BuildingPatterns = () => {
  return (
    <>
      {buildingData.map((buildingConf) => (
        <Building key={buildingConf.id} building={buildingConf} />
      ))}
    </>
  );
};

export default BuildingPatterns;
