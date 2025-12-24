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

  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('simon_leaderboard');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('simon_settings', JSON.stringify(settings));
  }, [settings]);

  // Функція для пошуку рекорду за ID (для ResultPage)
  const getRecordById = (id) => {
    return leaderboard.find(record => record.sessionId === id);
  };

  // Оновлена функція додавання рекорду з ID сесії
  const addRecord = (name, score, sessionId) => {
    if (score <= 0) return; 

    // Перевірка на дублікати за sessionId
    setLeaderboard(prev => {
      if (prev.some(r => r.sessionId === sessionId)) return prev;

      const newRecord = { name, score, sessionId, id: Date.now() };
      const updatedBoard = [...prev, newRecord]
        .sort((a, b) => b.score - a.score) 
        .slice(0, 5); 

      localStorage.setItem('simon_leaderboard', JSON.stringify(updatedBoard));
      return updatedBoard;
    });
  };

  const updateSettings = (newSettings) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, leaderboard, addRecord, getRecordById }}>
      {children}
    </SettingsContext.Provider>
  );
};