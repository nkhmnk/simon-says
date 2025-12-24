import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import { SettingsContext } from "../../context/SettingsContext";
import "./ResultPage.css";

const ResultPage = () => {
  const { settings, addRecord } = useContext(SettingsContext);
  const navigate = useNavigate();
  const { userId } = useParams(); // Отримання ID з URL
  const location = useLocation();
  const score = location.state?.score || 0; // Отримання рахунку

  useEffect(() => {
    if (score > 0) {
      addRecord(settings.playerName, score);
    }
  }, [score, settings.playerName, addRecord]);

  return (
    <div className="result-page">
      <Header title="Фінал гри" />

      <main className="result-container">
        <section className="score-card">
          <div className="player-badge">
            <span className="player-name">ID: {userId}</span>
          </div>
          <div className="score-display">
            <h2 className="score-label">{settings.playerName}, твій результат</h2>
            <div className="score-value">{score}</div>
            <p className="score-subtext">Пройдено рівнів</p>
          </div>
        </section>

        <section className="leaderboard-section">
          <Leaderboard />
        </section>

        <nav className="result-navigation">
          <button className="btn-action restart" onClick={() => navigate('/game')}>
            Грати знову
          </button>
          <button className="btn-action home" onClick={() => navigate('/')}>
            Головне меню
          </button>
        </nav>
      </main>

      <Footer />
    </div>
  );
};

export default ResultPage;