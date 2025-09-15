import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import DroneSlateSimulator from "./simulators/DroneSlateSimulator.jsx";
import DroneMountainSimulator from "./simulators/DroneMountainSimulator.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<DroneMountainSimulator />} />
        <Route path="/adv-slate" element={<DroneSlateSimulator />} />
        <Route path="/adv-himalayas" element={<DroneMountainSimulator />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
