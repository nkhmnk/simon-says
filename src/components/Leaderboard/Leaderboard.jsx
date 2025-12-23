import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import './Leaderboard.css';

const Leaderboard = () => {
  const { leaderboard } = useContext(SettingsContext);

  if (leaderboard.length === 0) return null;

  return (
    <div className="leaderboard">
      <h3>🏆 ТОП-5 Рекордів</h3>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={entry.id} className={index === 0 ? 'top-one' : ''}>
            <span className="rank">#{index + 1}</span>
            <span className="name">{entry.name}</span>
            <span className="score">{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;