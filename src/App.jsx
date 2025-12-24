import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Використовуємо Redux для перевірки стану
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultPage from './pages/ResultPage/ResultPage';
import NotFound from './pages/NotFound/NotFound';

function App() {
  // Отримуємо ім'я гравця безпосередньо з Redux Store
  const playerName = useSelector((state) => state.settings.playerName);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        
        {/* Захищений маршрут: якщо ім'я порожнє або 'Гравець' за замовчуванням (опціонально), 
            перенаправляємо на головну */}
        <Route 
          path="/game" 
          element={playerName && playerName !== "" ? <GamePage /> : <Navigate to="/" replace />} 
        />
        
        <Route path="/result/:userId" element={<ResultPage />} />
        
        <Route path="/404" element={<NotFound />} />
        
        {/* Всі інші маршрути ведуть на 404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;