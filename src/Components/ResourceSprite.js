import React from "react";

const ResourceSprite = ({ color, style, className = "", ...rest }) => {
	return (
		<div
			className={"resource " + className}
			style={{ backgroundColor: color, ...style }}
			{...rest}
		></div>
	);
};

export default ResourceSprite;
