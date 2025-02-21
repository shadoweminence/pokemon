import "./App.css";
import Details from "./components/Details";
import Index from "./components/Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/components/Details" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
