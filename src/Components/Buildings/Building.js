import BlueprintSprite from "Components/BlueprintSprite";
import withTooltip from "hoc/withTooltip";
import React from "react";
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
