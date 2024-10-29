import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '10px', backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <h1 style={{ margin: 0 }}>Weather App</h1>
      <nav>
        <Link to="/" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Weather</Link>
        <Link to="/favorites" style={{ color: '#fff', textDecoration: 'none' }}>Favorites</Link>
      </nav>
    </header>
  );
};

export default Header;
