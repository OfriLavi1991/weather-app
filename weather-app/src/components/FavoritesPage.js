import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/favoritesSlice';

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemove = (city) => {
    dispatch(removeFavorite(city));
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((city) => (
            <li key={city.Key}>
              {city.LocalizedName}, {city.Country.ID}
              <button onClick={() => handleRemove(city)}>Remove</button>
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
