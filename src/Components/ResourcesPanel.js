import React, { useEffect, useRef } from "react";
import withMouseMove from "../hoc/withMouseMove";
import useComboState from "../hooks/useComboState";
import useSelectionPattern from "../hooks/useSelectionPattern";
import ResourceSelector from "./ResourceSelector";
import ResourceSprite from "./ResourceSprite";

const ResourcesPanel = ({ sizeX = 4, sizeY = 4 }) => {
  const { isCellSelected, toggleCell, mask, resetMask } = useSelectionPattern();
  const {
    isSomethingPickedUp,
    building,
    resource,
    setBuilding,
    setResource,
    reset,
  } = useComboState();

  const ref = useRef(null);
  const MouseAttachedResource = withMouseMove(ResourceSprite);
  useEffect(() => {
    const eventHandler = function (e) {
      e.preventDefault();
      if (isSomethingPickedUp) {
        reset();
      }
    };
    const current = ref.current;
    current?.addEventListener("contextmenu", eventHandler);
    return () => {
      current?.removeEventListener("contextmenu", eventHandler);
    };
  }, [isSomethingPickedUp, reset]);

  return (
    <div className={isSomethingPickedUp ? "cursor-hidden" : ""} ref={ref}>
      {resource && (
        <MouseAttachedResource
          boundsRef={ref}
          name={resource.displayName}
          color={resource.color}
        />
      )}
      <p>
        Left click on resource to select. <br />
        Right click on resource to unselect.
      </p>
      <ResourceSelector setResource={setResource} />
      <div>Resource: {resource && resource.displayName}</div>
    </div>
  );
};

export default ResourcesPanel;
