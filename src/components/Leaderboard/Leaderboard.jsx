import React from 'react';
import { useSelector } from 'react-redux'; // Тільки читання
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  // Витягуємо масив рекордів зі слайсу game
  const leaderboard = useSelector((state) => state.game.leaderboard);

  if (leaderboard.length === 0) return <p style={{color: 'white'}}>Рекордів поки немає</p>;

  return (
    <div className={styles.leaderboard}>
      <h3 className={styles.title}>🏆 ТОП-5 (Redux State)</h3>
      <ul className={styles.list}>
        {leaderboard.map((entry, index) => (
          <li key={entry.id || entry.sessionId} className={styles.item}>
            <span className={styles.rank}>#{index + 1}</span>
            <span className={styles.name}>{entry.name}</span>
            <span className={styles.score}>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;