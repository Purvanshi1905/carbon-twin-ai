import { BrowserRouter, Routes, Route } from "react-router-dom";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import Simulator from "./pages/Simulator";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Assessment />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/simulator" element={<Simulator />} />
  <Route
    path="/recommendations"
    element={<Recommendations />}
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;