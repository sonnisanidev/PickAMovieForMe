// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  RECOMMENDATIONS: '/api/recommendations',
  MOVIE_DETAILS: (id) => `/api/movies/${id}`,
  SEARCH: '/api/movies/search'
};

// Genre IDs from TMDB
export const MOVIE_GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37
};

// Mood to genre mapping
export const MOOD_TO_GENRES = {
  happy: [
    MOVIE_GENRES.COMEDY,
    MOVIE_GENRES.FAMILY,
    MOVIE_GENRES.MUSIC
  ],
  sad: [
    MOVIE_GENRES.DRAMA,
    MOVIE_GENRES.ROMANCE
  ],
  excited: [
    MOVIE_GENRES.ACTION,
    MOVIE_GENRES.ADVENTURE,
    MOVIE_GENRES.SCIENCE_FICTION
  ],
  scared: [
    MOVIE_GENRES.HORROR,
    MOVIE_GENRES.THRILLER,
    MOVIE_GENRES.MYSTERY
  ],
  relaxed: [
    MOVIE_GENRES.ANIMATION,
    MOVIE_GENRES.DOCUMENTARY,
    MOVIE_GENRES.FANTASY
  ]
};
