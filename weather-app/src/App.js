import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import WeatherPage from './components/WeatherPage';
import FavoritesPage from './components/FavoritesPage';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/:key?" element={<WeatherPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; // חשוב: יש לייצא את App כברירת מחדל
