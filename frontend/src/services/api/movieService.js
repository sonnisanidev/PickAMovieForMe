import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.error || 'Failed to fetch movie data');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request');
    }
  }
);

const storageService = {
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

let genresCache = null;
let genresCacheExpiry = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getGenres = async () => {
  const now = Date.now();
  
  // Return cached genres if still valid
  if (genresCache && genresCacheExpiry && now < genresCacheExpiry) {
    return genresCache;
  }

  try {
    const response = await api.get('/api/genres');
    genresCache = response.data;
    genresCacheExpiry = now + CACHE_DURATION;
    return genresCache;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const cacheKey = { movieId };
    const cached = cacheService.get('details', cacheKey);
    if (cached) return cached;

    const response = await api.get(`/api/movie/${movieId}`);
    const movieDetails = response.data;
    
    cacheService.set('details', cacheKey, movieDetails);
    return movieDetails;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

const getMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`/api/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

const getMovieVideos = async (movieId) => {
  try {
    const response = await api.get(`/api/movie/${movieId}/videos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};

const getSimilarMovies = async (movieId) => {
  try {
    const response = await api.get(`/api/movie/${movieId}/similar`);
    return response.data;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};

export const movieService = {
  async getRecommendations({ mood, genres = [], page = 1, sort = 'popularity.desc' }) {
    if (!Array.isArray(genres)) {
      throw new Error('Genres must be an array');
    }
    
    try {
      console.debug('Fetching recommendations with params:', { mood, genres, page, sort });
      
      const genreString = genres.join(',');
      
      const response = await api.get('/api/recommendations', {
        params: {
          mood: mood?.toLowerCase(),
          genres: genreString,
          page,
          sort
        }
      });

      const { results, totalPages } = response.data;
      
      return {
        results,
        totalPages,
        currentPage: page
      };
    } catch (error) {
      console.error('Error fetching recommendations:', error.response?.data || error);
      throw error;
    }
  },
  getGenres,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  clearCache: cacheService.clear
};
