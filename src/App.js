import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/components/HomePage";
import NewGame from "../src/components/NewGame";
import Solver from "../src/components/Solver";
function App() {
  return (
    <div className="App m-0">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />;
          <Route path="new-game" element={<NewGame />} />;
          <Route path="solver" element={<Solver />} />;
        </Routes>
      </Router>
    </div>
  );
}

export default App;
