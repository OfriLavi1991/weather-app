import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, resetCities } from '../features/citySlice';
import { fetchWeather } from '../features/currentWeatherSlice'; // ייבוא fetchWeather בלבד מ-currentWeatherSlice
import { fetchForecast } from '../features/forecastSlice'; // ייבוא fetchForecast מהקובץ הנכון
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import { changeMetric, metricType } from '../features/selectedMetricSlice';
import { fahrenheitToCelsius } from '../utils';
import SearchBar from './SearchBar';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { changeCurrentLocation } from '../features/currentLocationSlice';

const WeatherPage = () => {
  const cities = useSelector((state) => state.cities.suggestions);
  const weather = useSelector((state) => state.currentWeather.data);
  const forecast = useSelector((state) => state.forecast.data);
  const favorites = useSelector((state) => state.favorites.items);
  const selectedMetric = useSelector((state) => state.selectedMetric.data);
  const currentLocation = useSelector((state) => state.currentLocation.data);
  
  const [query, setQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  let { key } = useParams();
  const dispatch = useDispatch();

  const isMetricDisplay = selectedMetric === metricType;
  
  useEffect(() => {
    if (weather) {
      setIsFavorite(favorites.some((city) => city.Key === currentLocation?.Key));
    }
  }, [currentLocation, favorites, weather]);

  useEffect(() => {
    if (key) {
      const location = favorites.find((city) => city.Key === key);
      if (location) {
        dispatch(fetchWeather(key));
        dispatch(fetchForecast(key));
        setQuery(location.LocalizedName);
        dispatch(changeCurrentLocation(location));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, dispatch]);

  const handleSearch = () => {
    dispatch(fetchCities(query));
  };

  const handleCitySelect = (city) => {
    dispatch(fetchWeather(city.Key));
    dispatch(fetchForecast(city.Key));
    dispatch(resetCities());
    setQuery(city.LocalizedName);
    dispatch(changeCurrentLocation(city));
  };

  const handleToggleFavorite = () => {
    if (currentLocation) {
      if (isFavorite) {
        dispatch(removeFavorite(currentLocation));
        toast.success(`${currentLocation?.LocalizedName} removed from favorites`);
      } else {
        dispatch(addFavorite(currentLocation));
        toast.success(`${currentLocation?.LocalizedName} added to favorites`);
      }
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div>
      <SearchBar 
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      {weather && (
        <div>
          <h2>{currentLocation?.AdministrativeArea?.CountryID} {currentLocation?.LocalizedName}</h2>
          <p>{weather.WeatherText}</p>
          <p>Temperature: {isMetricDisplay ? weather.Temperature.Metric.Value : weather.Temperature.Imperial.Value} <button onClick={() => dispatch(changeMetric())}>{isMetricDisplay ? '°C' : '°F'}</button></p>
        </div>
      )}
      {cities.length > 0 && (
        <ul>
          {cities.map((city) => (
            <li key={city.Key} onClick={() => handleCitySelect(city)}>
              {city.LocalizedName}, {city.Country.ID}
            </li>
          ))}
        </ul>
      )}
      {forecast && forecast.length > 0 && (
        <div>
          <h3>5-Day Forecast</h3>
          <ul>
            {forecast.map((day, index) => (
              <li key={index}>
                {day.Date}: {isMetricDisplay ? `${fahrenheitToCelsius(day.Temperature.Minimum.Value)}°C` : `${day.Temperature.Minimum.Value}°F`} - {isMetricDisplay ? `${fahrenheitToCelsius(day.Temperature.Maximum.Value)}°C` : `${day.Temperature.Maximum.Value}°F`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
