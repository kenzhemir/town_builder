import withTooltip from "hoc/withTooltip";
import React from "react";
import ResourceSprite from "./ResourceSprite";

const Resource = ({ name, color, ...rest }) => {
	const LabeledResource = withTooltip(ResourceSprite);

	return (
		<LabeledResource
			tooltipText={name}
			tooltipPosition="left"
			color={color}
			{...rest}
		/>
	);
};

export default Resource;
