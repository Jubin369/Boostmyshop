import { Routes, Route } from "react-router-dom";
import SpaceX from "./components/SpaceX";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SpaceX />} />
      </Routes>
    </>
  );
}

export default App;
