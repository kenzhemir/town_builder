import React from "react";
import withOnSelect from "../hoc/withOnSelect";
import Resource from "./Resource";

const resourceData = [
	{ id: "brick", displayName: "Brick", color: "firebrick" },
	{ id: "stone", displayName: "Stone", color: "gray" },
	{ id: "wood", displayName: "Wood", color: "saddlebrown" },
	{ id: "wheat", displayName: "Wheat", color: "orange" },
	{ id: "glass", displayName: "Glass", color: "blue" },
];

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
