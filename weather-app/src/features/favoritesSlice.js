// src/features/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(city => city.Key !== action.payload.Key);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
