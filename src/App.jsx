import React, { useState } from "react";
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultPage from './pages/ResultPage/ResultPage';
import "./App.css";

function App() {
  // Виправлення 1: Починаємо зі сторінки "start", а не "game"
  const [page, setPage] = useState("start");
  const [finalScore, setFinalScore] = useState(0);

  // Функція для початку гри (скидаємо очки та переходимо до гри)
  const startGame = () => {
    setFinalScore(0);
    setPage("game");
  };

  const handleGameOver = (score) => {
    setFinalScore(score);
    setPage("result");
  };

  const goToStart = () => {
    setPage("start");
  };

  return (
    <div className="App">
      {/* Сторінка Старту */}
      {page === "start" && (
        <StartPage onStart={startGame} />
      )}
      
      {/* Сторінка Гри */}
      {page === "game" && (
        <GamePage onGameOver={handleGameOver} />
      )}
      
      {/* Сторінка Результатів */}
      {page === "result" && (
        <ResultPage 
          score={finalScore} 
          onRestart={startGame} 
          onMain={goToStart} 
        />
      )}
    </div>
  );
}

export default App;