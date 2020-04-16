import React, { useState } from "react";
import ResourceSprite from "./ResourceSprite";

const ConstructionSite = ({ selectedResource }) => {
	const [resourceList, setResourceList] = useState([]);

	const onClickHandler = (e) => {
		const { x, y } = e.currentTarget.getBoundingClientRect();
		const left = e.pageX - x;
		const top = e.pageY - y;
		setResourceList([...resourceList, { left, top, ...selectedResource }]);
	};

	return (
		<div className="construction-site" onClick={onClickHandler}>
			<span>Construction Area</span>
			{resourceList.map(({ left, top, color }) => (
				<ResourceSprite
					style={{ top, left }}
					color={color}
					className="construction-block"
				/>
			))}
		</div>
	);
};

export default ConstructionSite;
