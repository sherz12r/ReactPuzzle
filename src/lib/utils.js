export const getTileCoords = (index, gridSize, tileSize) => {
  const column = index % gridSize;
  const row = index / gridSize << 0;
  return {
    column,
    row,
    left: column * tileSize,
    top: row * tileSize,
    tileId: index,
  };
};

export const distanceBetween = (tileACoords, tileBCoords) => {
  const sameRow = tileACoords.row === tileBCoords.row;
  const sameColumn = tileACoords.column === tileBCoords.column;
  const columnDiff = tileACoords.column - tileBCoords.column;
  const rowDiff = tileACoords.row - tileBCoords.row;
  const diffColumn = Math.abs(columnDiff) === 1;
  const diffRow = Math.abs(rowDiff) === 1;
  const sameRowDiffColumn = sameRow && diffColumn;
  const sameColumnDiffRow = sameColumn && diffRow;

  return {
    neighbours: sameRowDiffColumn || sameColumnDiffRow,
    distance: {
      rows: rowDiff,
      columns: columnDiff,
    },
  };
};

export const invert = (arr, indexA, indexB, fields) => {
  fields.forEach(field => {
    const sw = arr[indexA][field];
    arr[indexA][field] = arr[indexB][field];
    arr[indexB][field] = sw;
  });
};
