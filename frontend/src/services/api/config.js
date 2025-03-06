const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const API_ENDPOINTS = {
  // Movie endpoints
  MOVIE_DETAILS: (id) => `${BASE_URL}/movie/${id}`,
  MOVIE_VIDEOS: (id) => `${BASE_URL}/movie/${id}/videos`,
  MOVIE_RECOMMENDATIONS: (id) => `${BASE_URL}/movie/${id}/recommendations`,
  DISCOVER_MOVIES: `${BASE_URL}/discover/movie`,
  SEARCH_MOVIES: `${BASE_URL}/search/movie`,
  
  // Genre endpoints
  GENRES_LIST: `${BASE_URL}/genre/movie/list`,
};

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original'
  }
};

export const getImageUrl = (path, size = 'original', type = 'poster') => {
  if (!path) return null;
  const imageSize = IMAGE_SIZES[type]?.[size] || size;
  return `${IMAGE_BASE_URL}/${imageSize}${path}`;
};

export const DEFAULT_HEADERS = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

// Mood to genre mapping for recommendations
export const MOOD_GENRE_MAP = {
  happy: {
    genres: [35, 16, 10751], // Comedy, Animation, Family
    keywords: 'feel-good,uplifting,comedy',
    minRating: 6.0
  },
  sad: {
    genres: [18, 10749], // Drama, Romance
    keywords: 'emotional,touching,drama',
    minRating: 7.0
  },
  excited: {
    genres: [28, 12, 878], // Action, Adventure, Science Fiction
    keywords: 'action,adventure,thriller',
    minRating: 6.5
  },
  scared: {
    genres: [27, 53], // Horror, Thriller
    keywords: 'horror,suspense,thriller',
    minRating: 6.0
  },
  romantic: {
    genres: [10749, 18], // Romance, Drama
    keywords: 'romance,love,romantic',
    minRating: 6.5
  },
  thoughtful: {
    genres: [99, 18, 9648], // Documentary, Drama, Mystery
    keywords: 'thought-provoking,intellectual,philosophical',
    minRating: 7.0
  }
};
