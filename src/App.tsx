import React, { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";

import "./global-styles.scss";

const App: FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
