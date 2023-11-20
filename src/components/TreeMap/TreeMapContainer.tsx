import React, { useRef, useEffect } from "react";
import { TreeMapData, TreeMapChart } from "@/services/treemap";
import { TREE_MAP_ID } from "@/components/treemap/constants";

type TreeMapContainerProps = {
  title: string;
  data: Youtubers[];
  size: number;
  width: number;
  height: number;
};

const TreeMapContainer: React.FC<TreeMapContainerProps> = ({
  title,
  data,
  size,
  width,
  height,
}) => {
  const treeMapRef = useRef<TreeMapChart | null>(null);

  useEffect(() => {
    if (!treeMapRef.current) {
      const treeMapData = new TreeMapData<Youtubers>(title, size, data);
      const categorizedData = treeMapData.formatToGroupedNodes();
      treeMapRef.current = new TreeMapChart(
        TREE_MAP_ID,
        categorizedData,
        width,
        height
      );
    }
    treeMapRef.current.render();

    return () => {
      if (treeMapRef.current) {
        treeMapRef.current.clear();
      }
    };
  }, [data]);

  return <div id={TREE_MAP_ID} />;
};

export default TreeMapContainer;
