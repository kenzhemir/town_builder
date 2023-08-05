import { useState } from "react";

export default function useSelectionPattern() {
  const [pattern, setPattern] = useState({ x: 0, y: 0, mask: [], cells: [] });

  function isCellSelected(cell) {
    const maskX = cell.i - pattern.x;
    const maskY = cell.j - pattern.y;
    return Boolean(pattern.mask[maskX]?.[maskY]);
  }

  function constructMask(cells) {
    const minX = Math.min(...cells.map((cell) => cell.i));
    const minY = Math.min(...cells.map((cell) => cell.j));
    const maxX = Math.max(...cells.map((cell) => cell.i));
    const maxY = Math.max(...cells.map((cell) => cell.j));

    const cellsByCoords = cells.reduce((acc, cell) => {
      acc[`${cell.i}-${cell.j}`] = cell;
      return acc;
    }, {});

    const mask = [];
    for (let i = minX; i < maxX + 1; i++) {
      mask.push([]);
      for (let j = minY; j < maxY + 1; j++) {
        mask[i - minX].push(cellsByCoords[`${i}-${j}`]?.resource?.id ?? null);
      }
    }
    return { mask, x: minX, y: minY };
  }

  function selectCell(cell) {
    const cells = [...pattern.cells, cell];
    const { mask, x, y } = constructMask(cells);
    setPattern({ mask, x, y, cells });
  }

  function unselectCell(cell) {
    const cells = pattern.cells.filter(
      (patternCell) => patternCell.i !== cell.i || patternCell.j !== cell.j
    );
    const { mask, x, y } = constructMask(cells);
    setPattern({ mask, x, y, cells });
  }

  function toggleCell(cell) {
    if (isCellSelected(cell)) {
      unselectCell(cell);
    } else {
      selectCell(cell);
    }
  }

  function resetMask() {
    setPattern({ x: 0, y: 0, mask: [], cells: [] });
  }

  return {
    mask: pattern.mask,
    toggleCell,
    isCellSelected,
    resetMask,
  };
}
