import React, { useRef, useEffect } from "react";
import { TreeMapChart } from "./TreeMapGenerator";
import { TREE_MAP_ID } from "./constants";
import {
  normalizeYoutubersData,
  formatToGroupedNodes,
} from "../../utils/format";

type TreeMapContainerProps = {
  data: Youtubers;
};

const TreeMapContainer: React.FC<TreeMapContainerProps> = ({ data }) => {
  const treeMapRef = useRef<TreeMapChart | null>(null);

  useEffect(() => {
    if (!treeMapRef.current) {
      const youtubersProfile = normalizeYoutubersData(data);
      const categorizedData = formatToGroupedNodes(youtubersProfile);
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
