import { getImageUrl } from './api/config';
import { streamingService } from './api/streamingService';

// Format movie data for consistent use across components
export const formatMovieData = async (movie, country) => {
  if (!movie) return null;

  // Get streaming availability if IMDB ID is present
  let streamingInfo = null;
  if (movie.imdb_id) {
    try {
      const availability = await streamingService.getMovieAvailability(movie.imdb_id, country);
      streamingInfo = availability?.streamingInfo;
    } catch (error) {
      console.error('Error fetching streaming info:', error);
    }
  }

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: getImageUrl(movie.poster_path, 'medium', 'poster'),
    backdropPath: getImageUrl(movie.backdrop_path, 'large', 'backdrop'),
    releaseDate: movie.release_date,
    releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
    runtime: movie.runtime,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    genres: movie.genres || [],
    tagline: movie.tagline,
    status: movie.status,
    imdbId: movie.imdb_id,
    trailer: movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key,
    cast: movie.credits?.cast?.slice(0, 10) || [],
    crew: movie.credits?.crew?.filter(c => ['Director', 'Writer', 'Producer'].includes(c.job)) || [],
    recommendations: movie.recommendations?.map(rec => formatMovieData(rec)) || [],
    streamingInfo
  };
};

// Format movie list response with streaming info
export const formatMovieListResponse = async (response, country) => {
  if (!response) return null;

  const formattedMovies = await Promise.all(
    response.results.map(movie => formatMovieData(movie, country))
  );

  return {
    results: formattedMovies,
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results
  };
};

// Filter movies by streaming services
export const filterByStreamingServices = (movies, services, includeRentals = true) => {
  if (!services || services.length === 0) return movies;

  return movies.filter(movie => {
    if (!movie.streamingInfo) return false;

    const availableServices = Object.keys(movie.streamingInfo);
    
    // If not including rentals, filter out services with prices
    const validServices = includeRentals
      ? availableServices
      : availableServices.filter(service => 
          !movie.streamingInfo[service].price
        );

    return services.some(service => validServices.includes(service));
  });
};

// Local storage helpers
const STORAGE_KEYS = {
  RECENT_MOVIES: 'recentMovies',
  MOVIE_CACHE: 'movieCache',
  GENRES: 'genres'
};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const storageService = {
  // Get item from storage with expiry check
  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const { value, timestamp } = JSON.parse(item);
      if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }

      return value;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },

  // Set item in storage with timestamp
  setItem(key, value) {
    try {
      const item = {
        value,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  // Cache movie details
  cacheMovie(movie) {
    if (!movie?.id) return;
    const key = `${STORAGE_KEYS.MOVIE_CACHE}_${movie.id}`;
    this.setItem(key, movie);
  },

  // Get cached movie details
  getCachedMovie(movieId) {
    const key = `${STORAGE_KEYS.MOVIE_CACHE}_${movieId}`;
    return this.getItem(key);
  },

  // Save recent movies
  saveRecentMovies(movies) {
    const recentMovies = movies.slice(0, 10).map(movie => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.posterPath
    }));
    this.setItem(STORAGE_KEYS.RECENT_MOVIES, recentMovies);
  },

  // Get recent movies
  getRecentMovies() {
    return this.getItem(STORAGE_KEYS.RECENT_MOVIES) || [];
  },

  // Cache genres
  cacheGenres(genres) {
    this.setItem(STORAGE_KEYS.GENRES, genres);
  },

  // Get cached genres
  getCachedGenres() {
    return this.getItem(STORAGE_KEYS.GENRES);
  },

  // Clear all cached data
  clearCache() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
