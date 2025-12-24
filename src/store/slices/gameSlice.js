import { createSlice } from '@reduxjs/toolkit';

// Отримуємо початкові дані з localStorage
const loadLeaderboard = () => {
  const saved = localStorage.getItem('simon_leaderboard');
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  leaderboard: loadLeaderboard(),
  currentScore: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addRecord: (state, action) => {
      const { name, score, sessionId } = action.payload;
      
      // Перевірка на дублікати сесій
      if (state.leaderboard.some(r => r.sessionId === sessionId)) return;

      const newRecord = { 
        name, 
        score, 
        sessionId, 
        id: Date.now() 
      };

      // Додаємо, сортуємо та обмежуємо ТОП-5
      state.leaderboard = [...state.leaderboard, newRecord]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      // Синхронізація з localStorage
      localStorage.setItem('simon_leaderboard', JSON.stringify(state.leaderboard));
    },
    resetCurrentScore: (state) => {
      state.currentScore = 0;
    }
  },
});

export const { addRecord, resetCurrentScore } = gameSlice.actions;
export default gameSlice.reducer;