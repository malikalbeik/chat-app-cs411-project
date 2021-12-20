import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebHomeScreen from "./WebHomeScreen"

import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WebHomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
