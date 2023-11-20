import useHMR from "@/hooks/useHMR";
import youtuberStatistics from "@/data/youtuber_statistics.csv";
import TreeMapContainer from "@/components/treemap/TreeMapContainer";

const App = () => {
  useHMR();

  return (
    <main>
      <h1>Youtuber insights D3 hierarchy</h1>
      <TreeMapContainer
        title="Top Trending YouTube Channels"
        data={youtuberStatistics}
        size={200}
        width={1024}
        height={980}
      />
    </main>
  );
};

export default App;
