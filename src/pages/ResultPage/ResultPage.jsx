import React, { useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import { SettingsContext } from "../../context/SettingsContext";
import styles from "./ResultPage.module.css";

const ResultPage = () => {
  const { settings, getRecordById } = useContext(SettingsContext);
  const navigate = useNavigate();
  const { userId } = useParams(); // sessionId з URL
  const location = useLocation();
  
  // Отримуємо дані: або з навігації, або з бази рекордів за ID в URL
  const record = getRecordById(userId);
  const score = location.state?.score ?? record?.score ?? 0;

  return (
    <div className={styles.resultPage}>
      <Header title="Фінал гри" />

      <main className={styles.resultContainer}>
        <section className={styles.scoreCard}>
          <div className={styles.playerBadge}>
            <span className={styles.playerName}>ID Сесії: {userId}</span>
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