import React, { createContext, useState, useEffect } from 'react';

// Створюємо контекст
export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // Ініціалізуємо стан з localStorage або значеннями за замовчуванням
  const [settings, setSettingsState] = useState(() => {
    const savedSettings = localStorage.getItem('simon_settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      playerName: 'Гравець',
      difficulty: 'normal',
      elementsCount: 4,
      speed: 600
    };
  });

  // Щоразу, коли налаштування змінюються, зберігаємо їх у localStorage
  useEffect(() => {
    localStorage.setItem('simon_settings', JSON.stringify(settings));
  }, [settings]);

  // Функція для оновлення налаштувань
  const updateSettings = (newSettings) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};