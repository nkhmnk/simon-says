import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettingsState] = useState(() => {
    const saved = localStorage.getItem('simon_settings');
    return saved ? JSON.parse(saved) : {
      playerName: 'Гравець',
      difficulty: 'normal',
      elementsCount: 4,
      speed: 600
    };
  });

  // Додаємо стан для рекордів
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('simon_leaderboard');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('simon_settings', JSON.stringify(settings));
  }, [settings]);

  // Функція для додавання нового рекорду
  const addRecord = (name, score) => {
    if (score <= 0) return; 

    const newRecord = { name, score, id: Date.now() };
    const updatedBoard = [...leaderboard, newRecord]
      .sort((a, b) => b.score - a.score) 
      .slice(0, 5); 

    setLeaderboard(updatedBoard);
    localStorage.setItem('simon_leaderboard', JSON.stringify(updatedBoard));
  };

  const updateSettings = (newSettings) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, leaderboard, addRecord }}>
      {children}
    </SettingsContext.Provider>
  );
};