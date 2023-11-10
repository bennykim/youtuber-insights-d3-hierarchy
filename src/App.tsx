import { useEffect } from "react";
import useHMR from "./hooks/useHMR";
import file from "./data/youtubers.csv";

const App = () => {
  useHMR();

  useEffect(() => {
    console.log(file);
  }, []);

  return <h1>Youtuber insights D3 hierarchy</h1>;
};

export default App;
