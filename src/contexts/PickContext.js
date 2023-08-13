import { createContext, useContext, useEffect, useRef } from "react";

export const PickContext = createContext({
  picked: false,
  Component: null,
  data: {},
  boundsRef: null,
});
export const PickDispatchContext = createContext(null);

export function pickReducer(pickObject, action) {
  console.log("reducer", { pickObject, action });
  switch (action.type) {
    case "pick":
      return {
        ...pickObject,
        picked: true,
        Component: action.payload.Component,
        data: action.payload.data,
      };
    case "reset":
      return {
        ...pickObject,
        Component: null,
        data: {},
        picked: false,
      };
    case "boundary_reference":
      return {
        ...pickObject,
        boundsRef: action.payload.boundsRef,
      };
    default:
      return pickObject;
  }
}

export function usePickItem() {
  const dispatch = useContext(PickDispatchContext);
  return (Component, data) =>
    dispatch({
      type: "pick",
      payload: { Component, data },
    });
}

export function useMousePickBoundary() {
  const boundsRef = useRef(null);
  const dispatch = useContext(PickDispatchContext);
  const pickItem = useContext(PickContext);
  if (!pickItem?.boundsRef) {
    dispatch({
      type: "boundary_reference",
      payload: { boundsRef },
    });
  }
  return boundsRef;
}

export function useClearPick() {
  const dispatch = useContext(PickDispatchContext);
  return () =>
    dispatch({
      type: "reset",
    });
}

export function usePickedItemData() {
  const pickedItem = useContext(PickContext);
  return pickedItem?.data ?? {};
}

export function useIsItemPicked() {
  const pickedItem = useContext(PickContext);
  return pickedItem?.picked ?? false;
}

export function useRightClickReset(pickDispatch) {
  useEffect(() => {
    const eventHandler = function (e) {
      e.preventDefault();
      pickDispatch({ type: "reset" });
    };
    document.addEventListener("contextmenu", eventHandler);
    return () => {
      document.removeEventListener("contextmenu", eventHandler);
    };
  }, [pickDispatch]);
}
