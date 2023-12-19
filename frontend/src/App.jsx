import { ReactDOM } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NewEntry from "./pages/NewEntry.jsx";
import Year from "./pages/Year.jsx";
import Month from "./pages/Month.jsx";
import Daily from "./pages/Daily.jsx";
import Week from "./pages/Week.jsx";
import Category from "./pages/Category.jsx";
import SignUp from "./pages/Signup.jsx";
import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/year" element={<Year />} />
          <Route path="/daily" element={<Daily />} /> */}
          <Route path="/month" element={<Month />} />
          <Route path="/new-entry" element={<NewEntry />} />
          {/* <Route path="/week" element={<Week />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<div>login</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
