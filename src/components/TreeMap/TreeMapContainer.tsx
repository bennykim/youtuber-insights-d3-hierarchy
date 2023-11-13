import React, { useRef, useEffect } from "react";
import { TreeMapChart } from "./TreeMapGenerator";
import { TREE_MAP_ID } from "./constants";

type TreeMapContainerProps = {
  data: any;
};

const TreeMapContainer: React.FC<TreeMapContainerProps> = ({ data }) => {
  const treeMapRef = useRef<TreeMapChart | null>(null);

  useEffect(() => {
    if (!treeMapRef.current) {
      treeMapRef.current = new TreeMapChart(TREE_MAP_ID, data, 750, 500);
    }
    treeMapRef.current.render();
  }, [data]);

  return <div id={TREE_MAP_ID} />;
};

export default TreeMapContainer;
