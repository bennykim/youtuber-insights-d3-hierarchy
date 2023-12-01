import React, { useRef, useEffect } from "react";
import { TreeMapData, TreeMapChart } from "@/services/treemap";
import { TileType } from "@/utils/d3";

const TREEMAP_ID = "treemap";

type TreeMapProps = {
  title: string;
  data: Youtubers[];
  size: number;
  width: number;
  height: number;
  tile: TileType;
};

const TreeMap: React.FC<TreeMapProps> = ({
  title,
  data,
  size,
  width,
  height,
  tile,
}) => {
  const treeMapRef = useRef<TreeMapChart | null>(null);

  useEffect(() => {
    const treeMapData = new TreeMapData<Youtubers>(title, size, data);
    const categorizedData = treeMapData.formatToGroupedNodes();
    treeMapRef.current = new TreeMapChart(
      TREEMAP_ID,
      categorizedData,
      width,
      height,
      tile
    );
    treeMapRef.current.render();

    return () => {
      if (treeMapRef.current) {
        treeMapRef.current.clear();
      }
    };
  }, [data, tile]);

  return <div id={TREEMAP_ID} />;
};

export default TreeMap;
