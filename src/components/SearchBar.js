import React, { useState } from 'react';
import LocationButton from './LocationButton';
import { useDispatch } from 'react-redux';
import { fetchCities } from '../features/citySlice';

let timeout;

const SearchBar = ({ query, setQuery, setCurrentLocation }) => {
  const [isEnglishOnly, setIsEnglishOnly] = useState(true);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // בדיקה אם הכניסה היא באנגלית
    const englishRegex = /^[A-Za-z\s]*$/;
    setIsEnglishOnly(englishRegex.test(value));
    
    if (isEnglishOnly) {
      // מפעילים חיפוש אחרי 2 תווים
      if (value?.length > 2) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log('fetch cities', query);
          dispatch(fetchCities(query))
        }, 700);
      }
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
      {query?.length > 0 && !isEnglishOnly && 
        <p style={{ color: 'red' }}>Search only in English</p>
      }
      <div><LocationButton setCurrentLocation={setCurrentLocation} /></div>
    </div>
  );
};

export default SearchBar;