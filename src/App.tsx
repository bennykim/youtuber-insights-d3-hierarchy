import { useState } from "react";
import youtuberStatistics from "@/data/youtuberStatistics.csv";
import { TileType } from "@/utils/d3";
import TreeMap from "@/components/TreeMap";
import Select from "@/components/SelectBox";

const App = () => {
  const [tile, setTile] = useState<TileType>(TileType.binary);

  const handleOptionSelection = (value: TileType) => {
    setTile(value);
  };

  return (
    <main>
      <h1>Youtuber insights D3 hierarchy</h1>
      <Select<TileType> onChange={handleOptionSelection}>
        {Object.values(TileType).map((option) => (
          <Select.Option key={option} value={option}>
            <span>{option}</span>
          </Select.Option>
        ))}
      </Select>
      <TreeMap
        title="Top Trending YouTube Channels"
        data={youtuberStatistics}
        size={100}
        width={1024}
        height={980}
        tile={tile}
      />
    </main>
  );
};

export default App;
