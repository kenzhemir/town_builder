import React from "react";
import { resources } from "../gamedata/resources";
import ResourceSprite from "./ResourceSprite";

const BlueprintSprite = ({ blueprint, className = "", ...rest }) => {
  return (
    <div className="blueprint-sprite" {...rest}>
      {blueprint.map((row, i) => (
        <div className="blueprint-sprite-row" key={`spriterow${i}-${blueprint.displayName}`}>
          {row.map((resourceId, j) =>
            resourceId ? (
              <ResourceSprite
                color={resources[resourceId].color}
                className={className}
                key={`${resourceId}-${i}-${j}`}
              />
            ) : (
              <ResourceSprite
                color={"transparent"}
                className={className}
                style={{ borderColor: "transparent" }}
                key={`null-${i}-${j}`}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default BlueprintSprite;
