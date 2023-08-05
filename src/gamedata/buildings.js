export const buildings = {
  house: {
    id: "house",
    displayName: "House",
    icon: "🏠",
    blueprints: defaultOrientations([
      [null, "brick"],
      ["wheat", "glass"],
    ]),
  },
};

export const buildingData = Object.values(buildings);

// blueprint manipulators

function rotatable(blueprint) {
  return new Array(3)
    .fill(0)
    .reduce((acc) => [rotate(acc[0]), ...acc], [blueprint]);
}

function mirrorable(blueprint) {
  return [blueprint, mirror(blueprint)];
}

function defaultOrientations(blueprint) {
  return rotatable(blueprint).flatMap(mirrorable);
}

function rotate(matrix) {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
}

function mirror(matrix) {
  return matrix.map((row) => row.toReversed());
}
