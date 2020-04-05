import React, { useState, useEffect } from "react";
import withMouseMove from "../hoc/withMouseMove";
import withOnSelect from "../hoc/withOnSelect";
import Resource from "./Resource";

const resourceData = [
	{ id: "brick", displayName: "Brick", color: "brown" },
	{ id: "stone", displayName: "Stone", color: "gray" },
];

const ResourceSelector = () => {
	const [resource, setResource] = useState(null);
	const MouseAttachedResource = withMouseMove(Resource);
	const SelectableResource = withOnSelect(Resource);

	useEffect(() => {
		console.log("adding effect");
		const eventHandler = function (e) {
			if (resource !== null) {
				e.preventDefault();
				setResource(null);
			}
		};
		window.addEventListener("contextmenu", eventHandler);
		console.log("adding onclick");
		return () => {
			window.removeEventListener("contextmenu", eventHandler);
			console.log("removing onclick");
		};
	}, [resource]);

	return (
		<>
			{resource && (
				<MouseAttachedResource
					name={resource.displayName}
					color={resource.color}
				/>
			)}
			{resourceData.map((res) => (
				<SelectableResource
					key={res.id}
					onSelect={() => setResource(res)}
					color={res.color}
					name={res.displayName}
				/>
			))}
			<div>Resource: {resource && resource.displayName}</div>
		</>
	);
};

export default ResourceSelector;
