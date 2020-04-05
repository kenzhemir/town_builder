import React from "react";

const withOnSelect = (Component) => ({ onSelect, onClick, ...rest }) => {
	const onClickHandler = (e) => {
		onSelect && onSelect();
		onClick && onClick(e);
	};
	return <Component onClick={onClickHandler} {...rest} />;
};

export default withOnSelect;
