import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import WeatherPage from './components/WeatherPage';
import FavoritesPage from './components/FavoritesPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<WeatherPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
