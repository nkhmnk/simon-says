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
  const { userId } = useParams();
  const location = useLocation();

  const record = getRecordById(userId);
  const score = location.state?.score ?? record?.score ?? 0;

  if (!record && !location.state) {
    return (
      <div className={styles.resultPage}>
        <Header title="Помилка" />
        <p style={{color: 'white', textAlign: 'center', marginTop: '20px'}}>
          Результати цієї сесії не знайдені.
        </p>
        <button className={styles.homeBtn} onClick={() => navigate('/')} 
                style={{display: 'block', margin: '20px auto', padding: '10px 20px'}}>
          На головну
        </button>
      </div>
    );
  }

  return (
    <div className={styles.resultPage}>
      <Header title="Фінал гри" />
      <main className={styles.resultContainer}>
        <section className={styles.scoreCard}>
          <div className={styles.playerBadge}>
            <span>ID: {userId}</span>
          </div>
          <div className={styles.scoreDisplay}>
            <h2 className={styles.scoreLabel}>
              {settings?.playerName || 'Гравець'}, твій результат
            </h2>
            <div className={styles.scoreValue}>{score}</div>
          </div>
        </section>

        <section className={styles.leaderboardSection}>
          <Leaderboard />
        </section>

        <nav className={styles.resultNavigation}>
          <button className={`${styles.btnAction} ${styles.restart}`} onClick={() => navigate('/game')}>
            Грати знову
          </button>
          <button className={`${styles.btnAction} ${styles.home}`} onClick={() => navigate('/')}>
            Головне меню
          </button>
        </nav>
      </main>
      <Footer />
    </div>
  );
};

export default ResultPage;