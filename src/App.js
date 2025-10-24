import React, { useState, useEffect } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import "./styles/App.css";
import useSimonGame from "./hooks/useSimonGame";

function App() {
  const [page, setPage] = useState("start");
  const game = useSimonGame();

  useEffect(() => {
    // when hook marks game over, navigate to result page
    if (game.isGameOver) {
      setPage("result");
    }
  }, [game.isGameOver]);

  return (
    <div className="App">
      {page === "start" && (
        <StartPage
          onStart={() => {
            game.startGame();
            setPage("game");
          }}
        />
      )}

      {page === "game" && (
        <GamePage
          level={game.level}
          activeColor={game.activeColor}
          isShowing={game.isShowing}
          isUserTurn={game.isUserTurn}
          isGameOver={game.isGameOver}
          handleTileClick={game.handleTileClick}
          onGameOver={() => {
            // set score in hook already, just navigate
            setPage("result");
          }}
        />
      )}

      {page === "result" && (
        <ResultPage
          score={game.score}
          onRestart={() => {
            game.restart();
            setPage("game");
          }}
        />
      )}
    </div>
  );
}

export default App;
