import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherPage from './components/WeatherPage';
import FavoritesPage from './components/FavoritesPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
