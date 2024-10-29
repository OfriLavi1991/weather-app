// src/features/forecastSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get5DayForecast } from '../api/weatherApi';

// יצירת async thunk לשליפת תחזית ל-5 ימים
export const fetchForecast = createAsyncThunk('forecast/fetchForecast', async (locationKey) => {
  const forecast = await get5DayForecast(locationKey);
  return forecast;
});

const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default forecastSlice.reducer;
