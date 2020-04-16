import React, { useState, useEffect } from "react";

import "./styles/app.scss";
import ResourceSelector from "./Components/ResourceSelector";
import ResourceSprite from "./Components/ResourceSprite";
import withMouseMove from "./hoc/withMouseMove";
import ConstructionSite from "./Components/ConstructionSite";

function App() {
	const [resource, setResource] = useState(null);

	const MouseAttachedResource = withMouseMove(ResourceSprite);
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
		<div className={"App" + (resource ? " cursor-hidden" : "")}>
			{resource && (
				<MouseAttachedResource
					name={resource.displayName}
					color={resource.color}
				/>
			)}

			<p>Left click on resource to select.</p>
			<p>Right click on resource to unselect.</p>
			<ResourceSelector setResource={setResource} />
			<div>Resource: {resource && resource.displayName}</div>
			<ConstructionSite selectedResource={resource} />
		</div>
	);
}

export default App;
