import React, { useState } from "react";
import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultPage from "./pages/ResultPage/ResultPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("start");
  const [finalScore, setFinalScore] = useState(0);

  const handleGameOver = (score) => {
    setFinalScore(score);
    setPage("result");
  };

  return (
    <div className="App">
      {page === "start" && (
        <StartPage onStart={() => setPage("game")} />
      )}
      
      {page === "game" && (
        <GamePage onGameOver={handleGameOver} />
      )}
      
      {page === "result" && (
        <ResultPage 
          score={finalScore} 
          onRestart={() => setPage("game")} 
          onMain={() => setPage("start")} 
        />
      )}
    </div>
  );
}

export default App;