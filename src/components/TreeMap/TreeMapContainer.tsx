import React, { useRef, useEffect } from "react";
import { TreeMapData, TreeMapChart } from "@/services/treemap";
import { TREE_MAP_ID } from "@/components/treemap/constants";

type TreeMapContainerProps = {
  data: Youtubers;
};

const TreeMapContainer: React.FC<TreeMapContainerProps> = ({ data }) => {
  const treeMapRef = useRef<TreeMapChart | null>(null);

  useEffect(() => {
    if (!treeMapRef.current) {
      const treeMapData = new TreeMapData(data);
      const categorizedData = treeMapData.formatToGroupedNodes();
      treeMapRef.current = new TreeMapChart(
        TREE_MAP_ID,
        categorizedData,
        750,
        500
      );
    }
    treeMapRef.current.render();
  }, [data]);

  return <div id={TREE_MAP_ID} />;
};

export default TreeMapContainer;
