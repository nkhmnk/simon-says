import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Використовуємо Redux для отримання даних
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import styles from "./ResultPage.module.css";

const ResultPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // sessionId з URL
  const location = useLocation();

  // 1. Отримуємо налаштування з Redux Store
  const settings = useSelector((state) => state.settings);

  // 2. Отримуємо рекорди та шукаємо потрібний за ID
  const leaderboard = useSelector((state) => state.game.leaderboard);
  const record = leaderboard.find((r) => r.sessionId === userId);

  // 3. Визначаємо рахунок (пріоритет: переданий стан > знайдений рекорд > 0)
  const score = location.state?.score ?? record?.score ?? 0;

  // Якщо рекорду немає і ми не прийшли безпосередньо з гри
  if (!record && !location.state) {
    return (
      <div className={styles.resultPage}>
        <Header title="Помилка" />
        <div className={styles.resultContainer}>
          <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
            Результати цієї сесії не знайдені в системі Redux.
          </p>
          <button
            className={styles.homeBtn}
            onClick={() => navigate("/")}
            style={{
              display: "block",
              margin: "20px auto",
              padding: "10px 20px",
            }}
          >
            На головну
          </button>
        </div>
        <Footer />
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
              {settings?.playerName || "Гравець"}, твій результат
            </h2>
            <div className={styles.scoreValue}>{score}</div>
          </div>
        </section>

        <section className={styles.leaderboardSection}>
          <Leaderboard />
        </section>

        <nav className={styles.resultNavigation}>
          <button
            className={`${styles.btnAction} ${styles.restart}`}
            onClick={() => navigate("/game")}
          >
            Грати знову
          </button>
          <button
            className={`${styles.btnAction} ${styles.home}`}
            onClick={() => navigate("/")}
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