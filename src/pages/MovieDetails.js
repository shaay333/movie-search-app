import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';  // Import the spinner

const MovieDetails = () => {
  const { id } = useParams();  // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <ClipLoader color="#007bff" size={50} />;  // Show loading spinner
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: '300px', height: '450px', marginBottom: '20px' }}
      />
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</p>
    </div>
  );
};

export default MovieDetails;
