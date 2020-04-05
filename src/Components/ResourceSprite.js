import React from "react";

const ResourceSprite = ({ color, ...rest }) => {
	return (
		<div className="resource" style={{ backgroundColor: color }} {...rest}>
			X
		</div>
	);
};

export default ResourceSprite;
