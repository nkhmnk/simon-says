import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const { leaderboard } = useContext(SettingsContext);

  if (leaderboard.length === 0) return null;

  return (
    <div className={styles.leaderboard}>
      <h3 className={styles.title}>ТОП-5 Рекордів</h3>
      <ul className={styles.list}>
        {leaderboard.map((entry, index) => (
          <li 
            key={entry.id} 
            className={`${styles.item} ${index === 0 ? styles.topOne : ''}`}
          >
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