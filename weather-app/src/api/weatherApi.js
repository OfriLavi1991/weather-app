import { API_KEY, BASE_URL } from './apiConfig';

// פונקציה לחיפוש ערים (Autocomplete)
export const fetchCitySuggestions = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch city suggestions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// פונקציה לקבלת מזג אוויר נוכחי
export const fetchCurrentWeather = async (locationKey) => {
  try {
    const response = await fetch(`${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch current weather');
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

// פונקציה לקבלת תחזית ל-5 ימים
export const fetchFiveDayForecast = async (locationKey) => {
  try {
    const response = await fetch(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch 5-day forecast');
    }
    const data = await response.json();
    return data.DailyForecasts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
