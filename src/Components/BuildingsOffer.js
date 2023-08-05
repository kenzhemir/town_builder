import { buildingData } from "../gamedata/buildings";
import withOnSelect from "../hoc/withOnSelect";
import Building from "./Building";

export default function BuildingsOffer({ mask, setBuilding }) {
  const SelectableBuilding = withOnSelect(Building);

  const availableBuildings = buildingData
    .map((building) => ({
      building: building,
      blueprint: building.blueprints.find((blueprint) =>
        deepEqual(blueprint, mask)
      ),
    }))
    .filter(({ blueprint }) => blueprint);

  return (
    <div className="building-offers">
      <h5>Building you can place</h5>
      <div className="buildings">
        {availableBuildings.length
          ? availableBuildings.map(({ building }) => (
              <SelectableBuilding
                building={{...building, blueprints: [mask]}}
                key={building.displayName}
                onSelect={() => setBuilding(building)}
              />
            ))
          : "No available buildings found for your pattern!"}
      </div>
    </div>
  );
}

function deepEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((el, i) => deepEqual(el, b[i]));
  } else {
    return a === b;
  }
}
