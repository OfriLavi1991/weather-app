import { API_KEY, BASE_URL } from './apiConfig';

// פונקציה לקבלת הצעות לערים לפי חיפוש
export const getCitySuggestions = async (query) => {
  const response = await fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`);
  const data = await response.json();
  return data;
};

// פונקציה לחיפוש ערים לפי טקסט
export const searchCity = async (query) => {
  const response = await fetch(`${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`);
  const data = await response.json();
  return data;
};

// פונקציה לקבלת מזג אוויר נוכחי לפי מיקום
export const getCurrentWeather = async (locationKey) => {
  const response = await fetch(`${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};

// פונקציה לקבלת תחזית ל-5 ימים
export const get5DayForecast = async (locationKey) => {
  const response = await fetch(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};
