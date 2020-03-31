import React from "react";

const MyComponent = () => {
	const age = 21;
	const isNotTwentyOne = age => age != 21;
	const isTwentyOne = age => age == 21;
	const addOne = age => age++;
	return <div></div>;
};

export default MyComponent;
