import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCitySuggestions } from '../api/weatherApi';

// thunk שמבצע קריאה ל-API ומביא הצעות לערים לפי חיפוש
export const fetchCities = createAsyncThunk('cities/fetchCities', async (query) => {
  const cities = await getCitySuggestions(query);
  console.log("City suggestions from API:", cities); // הדפסת התוצאות המתקבלות
  return cities;
});

const citySlice = createSlice({
  name: 'cities',
  initialState: {
    suggestions: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestions = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default citySlice.reducer;
