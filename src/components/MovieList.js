import React from 'react';
import { toast } from 'react-toastify';

const MovieList = ({ movies }) => {
  const handleFavorite = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
  
    if (isAlreadyFavorite) {
      toast.info(`${movie.title} is already in favorites!`);
      return;
    }
  
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    toast.success(`${movie.title} added to favorites!`);
  };

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px', height: '300px' }}
            />
            <h3>{movie.title}</h3>
            <button onClick={() => handleFavorite(movie)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;




