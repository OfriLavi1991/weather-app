import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather } from '../api/weatherApi';
import toast from 'react-hot-toast'; // הוספת toast

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (locationKey) => {
  const weather = await fetchCurrentWeather(locationKey);
  return weather;
});

const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState: {
    data: null,
    status: 'idle',
    error: null
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
        toast.error('Failed to load current weather'); // הודעת שגיאה ב-toast
      });
  },
});

export default currentWeatherSlice.reducer;
