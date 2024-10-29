import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../features/citySlice';
import { fetchWeather } from '../features/currentWeatherSlice'; // ייבוא fetchWeather בלבד מ-currentWeatherSlice
import { fetchForecast } from '../features/forecastSlice'; // ייבוא fetchForecast מהקובץ הנכון
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import SearchBar from './SearchBar';
import toast from 'react-hot-toast';

const WeatherPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const cities = useSelector((state) => state.cities.suggestions);
  const weather = useSelector((state) => state.currentWeather.data);
  const forecast = useSelector((state) => state.forecast.data);
  const favorites = useSelector((state) => state.favorites.items);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (weather) {
      setIsFavorite(favorites.some((city) => city.Key === weather.Key));
    }
  }, [weather, favorites]);

  const handleSearch = () => {
    dispatch(fetchCities(query));
  };

  const handleCitySelect = (city) => {
    dispatch(fetchWeather(city.Key));
    dispatch(fetchForecast(city.Key));
    setQuery(city.LocalizedName);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(weather));
      toast.success(`${weather.LocalizedName} removed from favorites`);
    } else {
      dispatch(addFavorite(weather));
      toast.success(`${weather.LocalizedName} added to favorites`);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar 
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleCitySelect={handleCitySelect}
        cities={cities}
      />
      {weather && (
        <div>
          <h2>{weather.WeatherText}</h2>
          <p>Temperature: {weather.Temperature.Metric.Value} °C</p>
          <button onClick={handleToggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      )}
      {forecast.length > 0 && (
        <div>
          <h3>5-Day Forecast</h3>
          <ul>
            {forecast.map((day, index) => (
              <li key={index}>
                {day.Date}: {day.Temperature.Minimum.Value}°C - {day.Temperature.Maximum.Value}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
