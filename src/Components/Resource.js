import React from "react";
import withTooltip from "../hoc/withTooltip";
import ResourceSprite from "./ResourceSprite";

const Resource = ({ name, color, ...rest }) => {
	const LabeledResource = withTooltip(ResourceSprite);

	return (
		<LabeledResource
			tooltipText={name}
			tooltipPosition="bottom"
			color={color}
			{...rest}
		/>
	);
};

export default Resource;
