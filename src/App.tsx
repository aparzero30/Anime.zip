import { Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage/LandingPage";
import MainPage from "./MainPage/MainPage";
import AnimePage from "./AnimePage/AnimePage";
import WatchPage from "./WatchPage/WatchPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="anime" element={<MainPage />} />
        <Route path="info" element={<AnimePage />} />
        <Route path="stream" element={<WatchPage />} />
      </Routes>
    </div>
  );
}

export default App;
