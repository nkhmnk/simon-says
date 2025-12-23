// src/context/SettingsContext.jsx
import React, { createContext, useState } from 'react';

// Початкові налаштування за замовчуванням
const defaultSettings = {
  playerName: 'Гравець',
  difficulty: 'normal',
  elementsCount: 4,
  speed: 600,
};

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};