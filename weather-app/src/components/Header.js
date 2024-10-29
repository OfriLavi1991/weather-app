// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="app-title">Weather App</h1>
      <nav>
        <Link to="/weather" className="nav-link">Weather</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </nav>
    </header>
  );
};

export default Header;
