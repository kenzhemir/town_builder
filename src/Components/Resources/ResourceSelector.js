import { usePickItem } from "contexts/PickContext";
import { resourceData } from "gamedata/resources";
import withOnSelect from "hoc/withOnSelect";
import React from "react";
import Resource from "./Resource";

const ResourceSelector = () => {
  const setResource = usePickItem();

  const SelectableResource = withOnSelect(Resource);

  return (
    <div className="vertical-flex">
      {resourceData.map((res) => (
        <SelectableResource
          key={res.id}
          onSelect={() =>
            setResource(
              () => <Resource name={res.displayName} color={res.color} />,
              { resource: res }
            )
          }
          color={res.color}
          name={res.displayName}
        />
      ))}
    </div>
  );
};

export default ResourceSelector;
