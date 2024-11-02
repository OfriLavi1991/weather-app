import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './features/citySlice';
import currentWeatherReducer from './features/currentWeatherSlice';
import forecastReducer from './features/forecastSlice';
import favoritesReducer from './features/favoritesSlice';
import selectedMetricReducer from './features/selectedMetricSlice';
import currentLocationReducer from './features/currentLocationSlice';

const store = configureStore({
  reducer: {
    cities: cityReducer,
    currentWeather: currentWeatherReducer,
    forecast: forecastReducer,
    favorites: favoritesReducer,
    selectedMetric: selectedMetricReducer,
    currentLocation: currentLocationReducer,
  },
});

export default store;
