import React, { useState } from "react";
import StartPage from './pages/StartPage/StartPage';
import GamePage from './pages/GamePage/GamePage';
import ResultPage from './pages/ResultPage/ResultPage';
import "./App.css";
import CookieConsent from "react-cookie-consent";

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

      <CookieConsent
  location="bottom"
  buttonText="Прийняти"
  cookieName="simonSaysCookieConsent"
  style={{ background: "#2B373B", color: "#fff" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px", borderRadius: "5px" }}
  expires={150}
>
  Цей сайт використовує локальне сховище для збереження ваших рекордів. Продовжуючи гру, ви погоджуєтеся з нашою{" "}
  <a href="/PRIVACY_POLICY.md" style={{ color: "#ffd700" }}>Політикою конфіденційності</a>.
</CookieConsent>
    </div>
  );
}

export default App;