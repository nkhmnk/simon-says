import React, { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import "./styles/App.css";

function App() {
  const [page, setPage] = useState("start");

  return (
    <div className="App">
      {page === "start" && <StartPage />}
      {page === "game" && <GamePage />}
      {page === "result" && <ResultPage />}
    </div>
  );
}

export default App;
