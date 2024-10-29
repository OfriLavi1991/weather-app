import React, { useEffect } from 'react';

const SearchBar = ({ query, setQuery, handleSearch, handleCitySelect, cities, getLocationWeather }) => {
  // פונקציה לבדוק אם השפה היא אנגלית
  const isEnglish = (text) => /^[A-Za-z\s]*$/.test(text);

  // קריאה לפונקציית החיפוש כאשר יש טקסט בחיפוש
  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query, handleSearch]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city"
      />
      <button onClick={handleSearch}>Search</button>

      {/* אזהרה במקרה שהטקסט לא באנגלית */}
      {!isEnglish(query) && (
        <div style={{ color: 'red', marginTop: '5px' }}>
          Search only in English
        </div>
      )}

      {/* כפתור "Location" עם חיבור לפונקציה getLocationWeather */}
      <button onClick={getLocationWeather} style={{ display: 'block', marginTop: '5px' }}>
        My Location
      </button>

      {/* הצגת רשימת ערים רק כאשר יש טקסט בשדה החיפוש */}
      {query && cities.length > 0 && (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {cities.map((city) => (
            <li
              key={city.Key}
              onClick={() => handleCitySelect(city)}
              style={{ cursor: 'pointer', padding: '5px 0', borderBottom: '1px solid #ccc' }}
            >
              {city.LocalizedName}, {city.Country.ID}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
