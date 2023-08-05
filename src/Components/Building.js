import React from "react";
import withTooltip from "../hoc/withTooltip";
import BlueprintSprite from "./BlueprintSprite";
import BuildingSprite from "./BuildingSprite";

const Building = ({ building, ...rest }) => {
  const LabeledBuilding = withTooltip(BuildingSprite);

  return (
    <LabeledBuilding
      tooltipText={
        <div className="building-tooltip">
          {building.displayName}
          <div className="spacing10">
            <BlueprintSprite blueprint={building.blueprints[0]} />
          </div>
        </div>
      }
      tooltipPosition="bottom"
      building={building}
      {...rest}
    />
  );
};

export default Building;
