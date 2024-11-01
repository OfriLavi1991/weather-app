import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/favoritesSlice';
import { fetchCurrentWeather } from '../api/weatherApi';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const [citiesWeather, setCitiesWeather] = React.useState({});
  const dispatch = useDispatch();

  const handleRemove = (city) => {
    dispatch(removeFavorite(city));
  };

  useEffect(() => {
      favorites.map((city) => fetchCurrentWeather(city.Key)
        .then((data) => {
          console.log('fetched data');
          setCitiesWeather((state) => ({...state, [city.Key]: data}));
        }));
  }, [favorites]);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((city) => (
            <li key={city.Key}>
              {city?.AdministrativeArea?.CountryID}, {city?.LocalizedName}
              {citiesWeather[city.Key] && 
                <div>
                  <p>{citiesWeather[city.Key].WeatherText}</p>
                  <p>Temperature: {citiesWeather[city.Key].Temperature.Metric.Value} °C</p>
                </div>
              }
              <button onClick={() => handleRemove(city)}>Remove</button>
              <Link to={`/${city.Key}`}>Show 5 days forcast</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
