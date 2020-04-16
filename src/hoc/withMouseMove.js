import React, { useState, useEffect } from "react";

const MouseMove = ({ children }) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [started, setStarted] = useState(false);

	useEffect(() => {
		const eventHandler = ({ clientX, clientY }) => {
			setPosition({ x: clientX, y: clientY });
			setStarted(true);
		};

		window.addEventListener("mousemove", eventHandler);
		return () => {
			window.removeEventListener("mousemove", eventHandler);
		};
	}, [children]);
	return (
		<div
			style={{
				display: children != null && started ? "block" : "none",
				top: position.y,
				left: position.x,
			}}
			className="mouse-follower"
		>
			{children}
		</div>
	);
};

const withMouseMove = (Component) => (props) => {
	return (
		<MouseMove>
			<Component {...props} />
		</MouseMove>
	);
};

export default withMouseMove;
