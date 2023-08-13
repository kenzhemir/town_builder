import React from "react";

// styles in ./styles/partials/tooltip.scss
const withTooltip = (Component) => ({
	tooltipText,
	tooltipPosition = "right", //top, left, right, bottom
	...rest
}) => {
	return (
		<div className="tooltip">
			<span className={`tooltiptext tooltiptext--${tooltipPosition}`}>
				{tooltipText}
			</span>
			<Component {...rest} />
		</div>
	);
};

export default withTooltip;
