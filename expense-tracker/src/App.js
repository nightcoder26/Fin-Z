import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import overview from "./components/overview";
// import transactions from "./components/transactions";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
