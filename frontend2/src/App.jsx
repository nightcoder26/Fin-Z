import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages//Home.jsx";
import Year from "./pages/Year.jsx";
import Month from "./pages/Month.jsx";
import Daily from "./pages/Daily.jsx";
import NewEntry from "./pages/NewEntry.jsx";
import CatWise from "./pages/CatWise.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/year" element={<Year />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/monthly" element={<Month />} />
        <Route path="/new-entry" element={<NewEntry />} />
        <Route path="/category" element={<CatWise />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
