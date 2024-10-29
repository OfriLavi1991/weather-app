import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentWeather, get5DayForecast } from '../api/weatherApi';

// פעולה אסינכרונית להבאת מזג האוויר הנוכחי
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (locationKey) => {
    const data = await getCurrentWeather(locationKey);
    return data;
  }
);

// פעולה אסינכרונית להבאת תחזית ל-5 ימים
export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (locationKey) => {
    const data = await get5DayForecast(locationKey);
    return data;
  }
);

const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState: {
    data: null,
    forecast: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default currentWeatherSlice.reducer;
