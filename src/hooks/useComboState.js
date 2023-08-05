import { useCallback, useState } from "react";

export default function useComboState() {
  const [{ building, resource }, setCombo] = useState({
    building: null,
    resource: null,
  });
  const setBuilding = (building) => {
    setCombo({ building });
  };
  const setResource = (resource) => {
    setCombo({ resource });
  };
  const reset = useCallback(() => {
    setCombo({
      building: null,
      resource: null,
    });
  }, [setCombo]);

  return {
    isSomethingPickedUp: Boolean(building || resource),
    building,
    resource,
    setBuilding,
    setResource,
    reset,
  };
}
