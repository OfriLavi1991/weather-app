import React from 'react';
import { Toaster } from 'react-hot-toast';
import WeatherPage from './components/WeatherPage';
import FavoritesPage from './components/FavoritesPage';

function App() {
  return (
    <div>
      <Toaster position="bottom-center" />
      <WeatherPage />
      {/* ניתן להוסיף כאן ניווט לעמודים נוספים כמו FavoritesPage */}
    </div>
  );
}

export default App;
