import React, { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import HomeNavigate from "./components/HomeNavigate/HomeNavigate";
import "./global-styles.scss";

const App: FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/*" element={<HomeNavigate />}>
          <Route index element={<Home />} />
          <Route path="quiz/" element={<Quiz />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
