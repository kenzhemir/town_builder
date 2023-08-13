import React from "react";

const BuildingSprite = ({ building, className = "", ...rest }) => {
  return (
    <div className={"building " + className} {...rest}>
      {building.icon}
    </div>
  );
};

export default BuildingSprite;
