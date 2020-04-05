import ResourceSprite from "../Components/ResourceSprite";

export const Resources = {
	Brick: (props) => {
		return <ResourceSprite name="brick" color="brown" {...props} />;
	},
	Stone: (props) => {
		return <ResourceSprite name="stone" color="gray" {...props} />;
	},
};
