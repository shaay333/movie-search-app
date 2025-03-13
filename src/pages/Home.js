import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';  // Search bar component
import MovieList from '../components/MovieList';  // Movie list component

const Home = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <SearchBar onSearch={fetchMovies} />
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
