import { Routes, Route } from "react-router-dom";
import SpaceX from "./components/SpaceX";
import LaunchDate from "./components/LaunchDate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SpaceX />} />
        <Route path="/launchdate/:id" element={<LaunchDate />} />
      </Routes>
    </>
  );
}

export default App;
