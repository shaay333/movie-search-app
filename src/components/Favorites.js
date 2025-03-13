import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '200px', height: '300px' }}
              />
              <h3>{movie.title}</h3>
              <button onClick={() => removeFavorite(movie.id)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
