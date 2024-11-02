import { createSlice } from '@reduxjs/toolkit';

export const metricType = '°C';
export const imperialType = '°F';

const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {
    changeCurrentLocation: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { changeCurrentLocation } = currentLocationSlice.actions;
export default currentLocationSlice.reducer;
