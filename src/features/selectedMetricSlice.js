import { createSlice } from '@reduxjs/toolkit';

export const metricType = '°C';
export const imperialType = '°F';

const selectedMetricSlice = createSlice({
  name: 'selectedMetric',
  initialState: {
    data: metricType,
    status: 'idle',
    error: null
  },
  reducers: {
    changeMetric: (state) => {
      state.data = state.data === metricType ? imperialType : metricType;
    }
  },
});

export const { changeMetric } = selectedMetricSlice.actions;
export default selectedMetricSlice.reducer;
