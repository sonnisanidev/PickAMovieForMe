import axios from 'axios';
import { API_ENDPOINTS, DEFAULT_HEADERS, MOOD_GENRE_MAP } from './config';

// Create axios instance with default config
const tmdbApi = axios.create({
  headers: DEFAULT_HEADERS,
  timeout: 10000
});

// Error handler
const handleError = (error) => {
  const errorResponse = {
    message: 'An error occurred while fetching data',
    status: error.response?.status || 500,
    details: error.response?.data || error.message
  };
  console.error('TMDB API Error:', errorResponse);
  throw errorResponse;
};

// Response interceptor for common data transformation
tmdbApi.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(handleError(error))
);

export const tmdbService = {
  // Get movie details including videos and similar movies
  async getMovieDetails(movieId) {
    try {
      const [details, videos, recommendations] = await Promise.all([
        tmdbApi.get(API_ENDPOINTS.MOVIE_DETAILS(movieId), {
          params: { append_to_response: 'credits,keywords' }
        }),
        tmdbApi.get(API_ENDPOINTS.MOVIE_VIDEOS(movieId)),
        tmdbApi.get(API_ENDPOINTS.MOVIE_RECOMMENDATIONS(movieId))
      ]);

      return {
        ...details,
        videos: videos.results,
        recommendations: recommendations.results
      };
    } catch (error) {
      throw handleError(error);
    }
  },

  // Get movies based on mood
  async getMoviesByMood(mood, page = 1) {
    try {
      const moodConfig = MOOD_GENRE_MAP[mood];
      if (!moodConfig) {
        throw new Error('Invalid mood specified');
      }

      const response = await tmdbApi.get(API_ENDPOINTS.DISCOVER_MOVIES, {
        params: {
          with_genres: moodConfig.genres.join(','),
          with_keywords: moodConfig.keywords,
          'vote_average.gte': moodConfig.minRating,
          sort_by: 'popularity.desc',
          page,
          include_adult: false,
          language: 'en-US'
        }
      });

      return {
        results: response.results,
        totalPages: response.total_pages,
        totalResults: response.total_results,
        page: response.page
      };
    } catch (error) {
      throw handleError(error);
    }
  },

  // Search movies
  async searchMovies(query, page = 1) {
    try {
      const response = await tmdbApi.get(API_ENDPOINTS.SEARCH_MOVIES, {
        params: {
          query,
          page,
          include_adult: false,
          language: 'en-US'
        }
      });

      return {
        results: response.results,
        totalPages: response.total_pages,
        totalResults: response.total_results,
        page: response.page
      };
    } catch (error) {
      throw handleError(error);
    }
  },

  // Get movies by genre
  async getMoviesByGenre(genreId, page = 1) {
    try {
      const response = await tmdbApi.get(API_ENDPOINTS.DISCOVER_MOVIES, {
        params: {
          with_genres: genreId,
          sort_by: 'popularity.desc',
          page,
          include_adult: false,
          language: 'en-US'
        }
      });

      return {
        results: response.results,
        totalPages: response.total_pages,
        totalResults: response.total_results,
        page: response.page
      };
    } catch (error) {
      throw handleError(error);
    }
  },

  // Get all movie genres
  async getGenres() {
    try {
      const response = await tmdbApi.get(API_ENDPOINTS.GENRES_LIST);
      return response.genres;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Get trending movies
  async getTrendingMovies(timeWindow = 'week', page = 1) {
    try {
      const response = await tmdbApi.get(`${API_ENDPOINTS.BASE_URL}/trending/movie/${timeWindow}`, {
        params: { page }
      });

      return {
        results: response.results,
        totalPages: response.total_pages,
        totalResults: response.total_results,
        page: response.page
      };
    } catch (error) {
      throw handleError(error);
    }
  }
};
