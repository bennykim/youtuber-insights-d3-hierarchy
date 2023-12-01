import * as d3 from "d3";

export enum TileType {
  binary = "binary",
  squarify = "squarify",
  sliceDice = "sliceDice",
  dice = "dice",
  slice = "slice",
}

type TilingFunction = (
  node: d3.HierarchyRectangularNode<HierarchyDatum>,
  x0: number,
  y0: number,
  x1: number,
  y1: number
) => void;

export const tileFunctions: { [key in TileType]: TilingFunction } = {
  [TileType.binary]: d3.treemapBinary,
  [TileType.squarify]: d3.treemapSquarify,
  [TileType.sliceDice]: d3.treemapSliceDice,
  [TileType.dice]: d3.treemapDice,
  [TileType.slice]: d3.treemapSlice,
};
