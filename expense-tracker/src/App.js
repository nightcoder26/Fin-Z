import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.js";
import Year from "./pages/Year.js";
import Monthly from "./pages/Monthly.js";
import Daily from "./pages/Daily.js";
import NewEntry from "./pages/NewEntry.js";
import CatWise from "./pages/CatWise.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/year" element={<Year />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/new-entry" element={<NewEntry />} />
        <Route path="/category" element={<CatWise />} />
      </Routes>
    </Router>
  );
}

export default App;
