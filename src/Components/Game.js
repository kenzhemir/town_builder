import { useIsItemPicked, useMousePickBoundary } from "contexts/PickContext";
import { useParams } from "react-router";
import uesGameUpdates from "../hooks/useGameUpdates";
import ConstructionSite from "./ConstructionSite";
import ResourceSelector from "./Resources/ResourceSelector";

export default function Game({ userName = "miras" }) {
  const { gameId } = useParams();
  const ref = useMousePickBoundary();

  uesGameUpdates(gameId);

  return (
    <div ref={ref} className={useIsItemPicked() ? "game cursor-hidden" : "game"}>
      <ResourceSelector />
      <ConstructionSite />
    </div>
  );
}
