import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import { SettingsContext } from "../../context/SettingsContext";
import styles from "./ResultPage.module.css"; // Імпорт модулів

const ResultPage = () => {
  const { settings, addRecord } = useContext(SettingsContext);
  const navigate = useNavigate();
  const { userId } = useParams(); // Отримуємо динамічний ID з URL
  const location = useLocation();
  
  // Отримуємо рахунок, переданий через стан навігації
  const score = location.state?.score || 0;

  useEffect(() => {
    if (score > 0) {
      addRecord(settings.playerName, score);
    }
  }, [score, settings.playerName, addRecord]);

  return (
    <div className={styles.resultPage}>
      <Header title="Фінал гри" />

      <main className={styles.resultContainer}>
        <section className={styles.scoreCard}>
          <div className={styles.playerBadge}>
            <span className={styles.playerName}>ID: {userId}</span>
          </div>
          <div className={styles.scoreDisplay}>
            <h2 className={styles.scoreLabel}>{settings.playerName}, твій результат</h2>
            <div className={styles.scoreValue}>{score}</div>
            <p className={styles.scoreSubtext}>Пройдено рівнів</p>
          </div>
        </section>

        <section className={styles.leaderboardSection}>
          <Leaderboard />
        </section>

        <nav className={styles.resultNavigation}>
          <button 
            className={`${styles.btnAction} ${styles.restart}`} 
            onClick={() => navigate('/game')}
          >
            Грати знову
          </button>
          <button 
            className={`${styles.btnAction} ${styles.home}`} 
            onClick={() => navigate('/')}
          >
            Головне меню
          </button>
        </nav>
      </main>

      <Footer />
    </div>
  );
};

export default ResultPage;