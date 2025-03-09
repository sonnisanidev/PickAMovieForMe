const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// TMDB API configuration
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.use(cors());
app.use(express.json());

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'An error occurred while processing your request.' });
};

// Valid sort options
const VALID_SORT_OPTIONS = [
  'popularity.desc',
  'popularity.asc',
  'vote_average.desc',
  'vote_average.asc',
  'release_date.desc',
  'release_date.asc'
];

// Get movie recommendations based on mood, genres, and sorting
app.get('/api/recommendations', async (req, res) => {
  try {
    const { mood, genres, page = 1, sort = 'popularity.desc' } = req.query;
    
    // Validate sort parameter
    if (!VALID_SORT_OPTIONS.includes(sort)) {
      return res.status(400).json({ error: 'Invalid sort parameter' });
    }

    let movieResults = [];
    let totalPages = 0;

    // If mood is provided, use it to get recommendations
    if (mood) {
      const moodGenres = getMoodGenres(mood);
      const genreIds = await getGenreIds(moodGenres);
      const response = await getMoviesByGenres(genreIds, page, sort);
      movieResults = response.results;
      totalPages = response.total_pages;
    }
    // If specific genres are provided, use them
    else if (genres) {
      const genreList = genres.split(',').filter(Boolean);
      const genreIds = await getGenreIds(genreList);
      const response = await getMoviesByGenres(genreIds, page, sort);
      movieResults = response.results;
      totalPages = response.total_pages;
    }

    // Format movie results
    const formattedResults = movieResults.map(formatMovieData);

    res.json({
      results: formattedResults,
      totalPages: Math.min(totalPages, 500) // TMDB limits to 500 pages
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get movie recommendations' });
  }
});

// Get movie details by ID
app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movieResponse = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'credits,videos,similar'
      }
    });

    const movie = formatMovieData(movieResponse.data);
    res.json(movie);
  } catch (error) {
    console.error('Error getting movie details:', error);
    res.status(500).json({ error: 'Failed to get movie details' });
  }
});

// Helper function to get genre IDs from genre names
async function getGenreIds(genreNames) {
  try {
    const genresResponse = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_API_KEY }
    });

    const genreMap = genresResponse.data.genres.reduce((map, genre) => {
      map[genre.name.toLowerCase()] = genre.id;
      return map;
    }, {});

    return genreNames
      .map(name => genreMap[name.toLowerCase()])
      .filter(id => id !== undefined);
  } catch (error) {
    console.error('Error getting genre IDs:', error);
    throw error;
  }
}

// Helper function to get movies by genre IDs with sorting
async function getMoviesByGenres(genreIds, page = 1, sort = 'popularity.desc') {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreIds.join(','),
        page,
        sort_by: sort,
        include_adult: false,
        vote_count: sort.startsWith('vote_average') ? 100 : 0 // Minimum vote count for rating-based sorting
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting movies by genres:', error);
    throw error;
  }
}

// Helper function to format movie data
function formatMovieData(movie) {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    genres: movie.genres?.map(genre => genre.name) || [],
    runtime: movie.runtime,
    credits: movie.credits,
    videos: movie.videos,
    similar: movie.similar?.results?.map(formatMovieData) || []
  };
}

// Helper function to map moods to genres
function getMoodGenres(mood) {
  const moodGenreMap = {
    happy: ['Comedy', 'Adventure', 'Family'],
    sad: ['Drama', 'Romance'],
    excited: ['Action', 'Science Fiction', 'Adventure'],
    relaxed: ['Animation', 'Family', 'Fantasy'],
    scared: ['Horror', 'Thriller', 'Mystery'],
    thoughtful: ['Documentary', 'History', 'Drama']
  };

  return moodGenreMap[mood.toLowerCase()] || ['Action', 'Adventure', 'Comedy'];
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
