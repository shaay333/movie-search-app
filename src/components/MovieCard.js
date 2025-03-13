import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
      <div className="movie-card">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </Link>
        <p>Rating: {movie.vote_average}</p>
      </div>
    );
  };
export default MovieCard;
