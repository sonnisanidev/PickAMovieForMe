import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './movieConfig';

// Create axios instance for our backend API
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.error || 'Failed to fetch movie data');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request');
    }
  }
);

// Local storage service for caching and preferences
export const storageService = {
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Cache service for movie data
const cacheService = {
  CACHE_PREFIX: 'movie_cache_',
  CACHE_DURATION: 1000 * 60 * 5, // 5 minutes

  getCacheKey: (type, params) => {
    return `${cacheService.CACHE_PREFIX}${type}_${JSON.stringify(params)}`;
  },

  get: (type, params) => {
    const key = cacheService.getCacheKey(type, params);
    const cached = storageService.getItem(key);
    
    if (cached && Date.now() - cached.timestamp < cacheService.CACHE_DURATION) {
      return cached.data;
    }
    
    return null;
  },

  set: (type, params, data) => {
    const key = cacheService.getCacheKey(type, params);
    storageService.setItem(key, {
      data,
      timestamp: Date.now()
    });
  },

  clear: () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(cacheService.CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
};

export const movieService = {
  // Get movie recommendations based on mood and genres
  async getRecommendations({ mood, genres = [], page = 1 }) {
    try {
      const cacheKey = { mood, genres: genres.sort().join(','), page };
      const cached = cacheService.get('recommendations', cacheKey);
      if (cached) return cached;

      const params = new URLSearchParams();
      if (mood) params.append('mood', mood);
      if (genres.length) params.append('genres', genres.join(','));
      params.append('page', page);

      const response = await api.get(`${API_ENDPOINTS.RECOMMENDATIONS}?${params}`);
      cacheService.set('recommendations', cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie recommendations:', error);
      throw error;
    }
  },

  // Get movie details by ID
  async getMovieDetails(movieId) {
    try {
      const cached = cacheService.get('details', movieId);
      if (cached) return cached;

      const response = await api.get(API_ENDPOINTS.MOVIE_DETAILS(movieId));
      cacheService.set('details', movieId, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Search movies by title
  async searchMovies(query, page = 1) {
    try {
      const cacheKey = { query, page };
      const cached = cacheService.get('search', cacheKey);
      if (cached) return cached;

      const params = new URLSearchParams({
        query,
        page
      });

      const response = await api.get(`${API_ENDPOINTS.SEARCH}?${params}`);
      cacheService.set('search', cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Clear all movie-related caches
  clearCache() {
    cacheService.clear();
  }
};
