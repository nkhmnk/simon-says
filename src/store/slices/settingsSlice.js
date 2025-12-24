import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playerName: localStorage.getItem('playerName') || 'Гравець',
  elementsCount: Number(localStorage.getItem('elementsCount')) || 4,
  speed: Number(localStorage.getItem('speed')) || 600,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      const { playerName, elementsCount, speed } = action.payload;
      state.playerName = playerName;
      state.elementsCount = elementsCount;
      state.speed = speed;
      
      // Синхронізація з localStorage
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('elementsCount', elementsCount);
      localStorage.setItem('speed', speed);
    },
  },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;