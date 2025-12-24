import { configureStore } from '@reduxjs/toolkit';
// Шлях ./slices/ означає "в цій же папці, де я, є папка slices"
import settingsReducer from './slices/settingsSlice';
import gameReducer from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    game: gameReducer,
  },
});