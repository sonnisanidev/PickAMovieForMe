require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());

// TMDB API Configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Helper function to map mood to genres
const MOOD_TO_GENRES = {
  happy: [35, 10751, 10402], // Comedy, Family, Music
  sad: [18, 10749], // Drama, Romance
  excited: [28, 12, 878], // Action, Adventure, Science Fiction
  scared: [27, 53, 9648], // Horror, Thriller, Mystery
  relaxed: [16, 99, 14] // Animation, Documentary, Fantasy
};

// Helper function to get movie details with external IDs
async function getMovieWithExternalIds(movieId) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'external_ids'
      }
    });
    return {
      id: response.data.id,
      imdbId: response.data.external_ids?.imdb_id,
      title: response.data.title,
      overview: response.data.overview,
      posterPath: response.data.poster_path,
      releaseDate: response.data.release_date,
      voteAverage: response.data.vote_average,
      genres: response.data.genres.map(g => g.id)
    };
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    return null;
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get movie recommendations
app.get('/api/movies/recommendations', async (req, res) => {
  try {
    const { mood, genres = [], page = 1 } = req.query;
    
    // Convert genres string to array if needed
    const genresList = typeof genres === 'string' ? genres.split(',').filter(Boolean) : genres;
    
    // Get mood-based genres and combine with selected genres
    const moodGenres = mood ? MOOD_TO_GENRES[mood.toLowerCase()] || [] : [];
    const allGenres = [...new Set([...moodGenres, ...genresList])];

    const params = {
      with_genres: allGenres.join(','),
      sort_by: 'popularity.desc',
      include_adult: false,
      page: parseInt(page)
    };

    const response = await tmdbApi.get('/discover/movie', { params });
    
    // Get external IDs for each movie
    const moviesWithIds = await Promise.all(
      response.data.results.map(movie => getMovieWithExternalIds(movie.id))
    );

    // Filter out any null results from failed requests
    const validMovies = moviesWithIds.filter(movie => movie !== null);
    
    res.json({
      results: validMovies,
      currentPage: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    });
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.status_message || 'Failed to fetch movie recommendations'
    });
  }
});

// Search movies (must come before the :id route to avoid conflicts)
app.get('/api/movies/search', async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page: parseInt(page),
        include_adult: false
      }
    });

    // Get external IDs for search results
    const moviesWithIds = await Promise.all(
      response.data.results.map(movie => getMovieWithExternalIds(movie.id))
    );

    // Filter out any null results from failed requests
    const validMovies = moviesWithIds.filter(movie => movie !== null);

    res.json({
      results: validMovies,
      currentPage: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.status_message || 'Failed to search movies'
    });
  }
});

// Get movie details (must come after search to avoid conflicts)
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await tmdbApi.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,external_ids'
      }
    });

    res.json({
      ...response.data,
      imdbId: response.data.external_ids?.imdb_id
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.status_message || 'Failed to fetch movie details'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
