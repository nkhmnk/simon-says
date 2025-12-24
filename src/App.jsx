import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultPage from './pages/ResultPage/ResultPage';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<StartPage />} />
          
          {/* Сторінка самої гри */}
          <Route path="/game" element={<GamePage />} />
          
          {/* Динамічний роутинг для результатів з ID користувача */}
          <Route path="/result/:userId" element={<ResultPage />} />
          
          {/* Перенаправлення на головну, якщо маршрут не існує */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;