import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCitySuggestions } from '../api/weatherApi';
import toast from 'react-hot-toast'; // הוספת toast

export const fetchCities = createAsyncThunk('cities/fetchCities', async (query) => {
  const cities = await fetchCitySuggestions(query);
  return cities;
});

const citySlice = createSlice({
  name: 'cities',
  initialState: {
    suggestions: [],
    status: 'idle',
    error: null
  },
  reducers: {
    resetCities: (state) => {
      state.suggestions = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestions = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error('Failed to load city suggestions'); // הודעת שגיאה ב-toast
      });
  },
});

export const { resetCities } = citySlice.actions;
export default citySlice.reducer;
