import React from "react";
import { resourceData } from "../gamedata/resources";
import withOnSelect from "../hoc/withOnSelect";
import Resource from "./Resource";

const ResourceSelector = ({ setResource }) => {
  const SelectableResource = withOnSelect(Resource);

  return (
    <>
      {resourceData.map((res) => (
        <SelectableResource
          key={res.id}
          onSelect={() => setResource(res)}
          color={res.color}
          name={res.displayName}
        />
      ))}
    </>
  );
};

export default ResourceSelector;
