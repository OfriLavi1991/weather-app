import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFiveDayForecast } from '../api/weatherApi';
import toast from 'react-hot-toast'; // הוספת toast

export const fetchForecast = createAsyncThunk('forecast/fetchForecast', async (locationKey) => {
  const forecast = await fetchFiveDayForecast(locationKey);
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
        toast.error('Failed to load 5-day forecast'); // הודעת שגיאה ב-toast
      });
  },
});

export default forecastSlice.reducer;
