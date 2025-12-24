import React, { useState } from "react";
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultPage from './pages/ResultPage/ResultPage';
import "./App.css";

function App() {
  const [page, setPage] = useState("start");
  const [finalScore, setFinalScore] = useState(0);

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
      {page === "start" && (
        <StartPage onStart={startGame} />
      )}
      
      {page === "game" && (
        <GamePage onGameOver={handleGameOver} />
      )}
      
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