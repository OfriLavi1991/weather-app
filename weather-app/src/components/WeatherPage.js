import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../features/citySlice';
import { fetchWeather, fetchForecast } from '../features/currentWeatherSlice';
import { addFavorite } from '../features/favoritesSlice';

const WeatherPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const cities = useSelector((state) => state.cities.suggestions);
  const weather = useSelector((state) => state.currentWeather.data);
  const forecast = useSelector((state) => state.forecast.data);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      dispatch(fetchCities(e.target.value));
    }
  };

  const handleCitySelect = (city) => {
    setQuery(city.LocalizedName);
    if (city.Key) {
      dispatch(fetchWeather(city.Key));
      dispatch(fetchForecast(city.Key));
    }
  };

  const handleSaveFavorite = () => {
    if (weather) {
      dispatch(addFavorite(weather));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a city"
      />
      <button onClick={handleSaveFavorite}>Save</button>

      {cities.length > 0 && (
        <ul>
          {cities.map((city) => (
            <li key={city.Key} onClick={() => handleCitySelect(city)}>
              {city.LocalizedName}, {city.Country.ID}
            </li>
          ))}
        </ul>
      )}

      {weather && weather.Temperature && weather.WeatherText && (
        <div>
          <h2>{weather.WeatherText}</h2>
          <p>Temperature: {weather.Temperature.Metric?.Value} °C</p>
        </div>
      )}

      {forecast && forecast.length > 0 && (
        <div>
          <h3>5-Day Forecast</h3>
          <ul>
            {forecast.map((day, index) => (
              <li key={index}>
                {day.Date}: {day.Temperature.Minimum?.Value}°C - {day.Temperature.Maximum?.Value}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
