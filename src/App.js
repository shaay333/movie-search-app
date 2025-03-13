import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMovies = async (query, page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=${page}`
      );
      setMovies(response.data.results);
    } catch (error) {
      toast.error('Error fetching movies. Please try again.');
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setPage(newPage);
    fetchMovies('batman', newPage); // Example query for pagination
  };

  return (
    <Router basename="/movie-search-app">
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />

        <nav>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Movie Search App</h1>
                <SearchBar onSearch={(query) => fetchMovies(query, 1)} />
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <MovieList movies={movies} />
                    <div>
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                      >
                        Previous
                      </button>
                      <button onClick={() => handlePageChange(page + 1)}>
                        Next
                      </button>
                    </div>
                  </>
                )}
              </>
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
