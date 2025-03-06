# API Documentation

## Theme Configuration

### Base Configuration
```javascript
const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'light';
```

### Theme Management

#### 1. Get User Theme Preference
```javascript
// themeService.js
export const getUserTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return savedTheme || (prefersDark ? 'dark' : 'light');
};
```

#### 2. Set User Theme
```javascript
// themeService.js
export const setUserTheme = (theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
```

#### 3. Watch System Theme Changes
```javascript
// themeService.js
export const watchSystemTheme = (callback) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e) => callback(e.matches ? 'dark' : 'light');
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
};
```

#### 4. Theme-Aware Image Loading
```javascript
// themeService.js
export const getThemeAwareImageUrl = (lightUrl, darkUrl) => {
  const theme = getUserTheme();
  return theme === 'dark' ? darkUrl : lightUrl;
};
```

## Movie Service Integration

### Base Configuration
```javascript
const MOVIE_API_BASE_URL = process.env.REACT_APP_API_URL;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;

// Theme-aware configuration
const POSTER_CONFIG = {
  light: {
    quality: 'w500',
    fallback: '/images/light/poster-placeholder.jpg'
  },
  dark: {
    quality: 'w500',
    fallback: '/images/dark/poster-placeholder.jpg'
  }
};
```

### Movie Service APIs

#### 1. Get Movie Details
```javascript
// movieService.js
export const getMovieDetails = async (movieId, options = {}) => {
  const theme = getUserTheme();
  const response = await axios.get(`${MOVIE_API_BASE_URL}/movies/${movieId}`, {
    params: {
      api_key: TMDB_API_KEY,
      theme // Send theme preference to get appropriate image URLs
    }
  });

  return {
    ...response.data,
    // Use theme-aware poster and backdrop paths
    posterPath: getThemeAwareImageUrl(
      response.data.posterPath.light,
      response.data.posterPath.dark
    ),
    backdropPath: getThemeAwareImageUrl(
      response.data.backdropPath.light,
      response.data.backdropPath.dark
    )
  };
};
```

#### 2. Get Movie Recommendations
```javascript
// movieService.js
export const getMovieRecommendations = async (params) => {
  const theme = getUserTheme();
  const response = await axios.get(`${MOVIE_API_BASE_URL}/movies/recommendations`, {
    params: {
      ...params,
      theme,
      api_key: TMDB_API_KEY
    }
  });

  return {
    ...response.data,
    results: response.data.results.map(movie => ({
      ...movie,
      posterPath: getThemeAwareImageUrl(
        movie.posterPath.light,
        movie.posterPath.dark
      )
    }))
  };
};
```

## Streaming API Integration

### Base Configuration
```javascript
const STREAMING_API_BASE_URL = process.env.REACT_APP_STREAMING_API_URL;
const STREAMING_API_KEY = process.env.REACT_APP_STREAMING_API_KEY;

// Theme-aware configuration
const STREAMING_UI_CONFIG = {
  light: {
    serviceLogos: {
      netflix: '/images/light/netflix.svg',
      prime: '/images/light/prime.svg',
      disney: '/images/light/disney.svg'
    },
    priceTag: {
      background: 'bg-blue-100',
      text: 'text-blue-800'
    }
  },
  dark: {
    serviceLogos: {
      netflix: '/images/dark/netflix.svg',
      prime: '/images/dark/prime.svg',
      disney: '/images/dark/disney.svg'
    },
    priceTag: {
      background: 'bg-blue-900',
      text: 'text-blue-100'
    }
  }
};
```

### Streaming Service APIs

#### 1. Get Movie Availability
```typescript
// Types
interface StreamingResponse {
  imdbId: string;
  title: string;
  streamingInfo: {
    [service: string]: {
      type: 'subscription' | 'rental' | 'purchase' | 'free';
      price?: number;
      currency?: string;
      quality?: string;
      link: string;
      availableUntil?: string;
    }
  };
  country: string;
  theme: string;
  uiConfig: {
    serviceLogos: Record<string, string>;
    priceTag: {
      background: string;
      text: string;
    }
  }
}

// API Function
export const getMovieAvailability = async (
  imdbId: string,
  country = 'US',
  theme = 'light'
): Promise<StreamingResponse> => {
  const response = await axios.get(
    `${STREAMING_API_BASE_URL}/movie/${imdbId}/availability`,
    {
      params: { country, theme },
      headers: { 'X-API-Key': STREAMING_API_KEY }
    }
  );

  return {
    ...response.data,
    uiConfig: STREAMING_UI_CONFIG[theme]
  };
};
```

#### 2. Search Movies by Streaming Service
```typescript
// Types
interface SearchOptions {
  services: string[];
  country?: string;
  type?: 'subscription' | 'rental' | 'purchase' | 'free';
  page?: number;
  limit?: number;
  theme?: string;
}

interface SearchResponse {
  results: Array<{
    imdbId: string;
    title: string;
    streamingInfo: StreamingResponse['streamingInfo'];
    tmdbInfo: {
      posterPath: {
        light: string;
        dark: string;
      };
      // ... other TMDB data
    };
  }>;
  page: number;
  totalResults: number;
  totalPages: number;
  uiConfig: {
    serviceLogos: Record<string, string>;
    priceTag: {
      background: string;
      text: string;
    }
  }
}

// API Function
export const searchByStreamingService = async (
  options: SearchOptions
): Promise<SearchResponse> => {
  const theme = options.theme || 'light';
  const response = await axios.get(
    `${STREAMING_API_BASE_URL}/search`,
    {
      params: {
        services: options.services,
        country: options.country || 'US',
        type: options.type,
        page: options.page || 1,
        limit: options.limit || 20,
        theme
      },
      headers: { 'X-API-Key': STREAMING_API_KEY }
    }
  );

  return {
    ...response.data,
    uiConfig: STREAMING_UI_CONFIG[theme]
  };
};
```

### Caching Strategy

```javascript
// Cache configuration
const CACHE_CONFIG = {
  maxAge: 1000 * 60 * 15, // 15 minutes
  maxItems: 100
};

// Cache key generation
const getCacheKey = (type, params) => {
  switch (type) {
    case 'availability':
      return `streaming:${params.imdbId}:${params.country}:${params.theme}`;
    case 'search':
      return `search:${params.services.join(',')}:${params.country}:${params.page}:${params.theme}`;
    case 'services':
      return `services:${params.country}`;
  }
};

// Cache implementation
export class StreamingCache {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() - item.timestamp > CACHE_CONFIG.maxAge) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  set(key, data) {
    if (this.cache.size >= CACHE_CONFIG.maxItems) {
      // Remove oldest item
      const oldestKey = Array.from(this.cache.keys())[0];
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}
```

### Error Responses

#### Rate Limit Exceeded
```json
{
  "error": "rate_limit_exceeded",
  "message": "API rate limit exceeded",
  "retryAfter": 60
}
```

#### Invalid API Key
```json
{
  "error": "invalid_api_key",
  "message": "Invalid or missing API key"
}
```

#### Region Not Supported
```json
{
  "error": "region_not_supported",
  "message": "Streaming data not available for region: XX"
}
```

### Usage Examples

#### Fetch Movie Availability
```javascript
const getMovieAvailability = async (imdbId, country = 'US', theme = 'light') => {
  try {
    const response = await axios.get(
      `${STREAMING_API_BASE_URL}/movie/${imdbId}/availability`,
      {
        params: { country, theme },
        headers: { 'X-API-Key': STREAMING_API_KEY }
      }
    );
    return response.data;
  } catch (error) {
    handleStreamingApiError(error);
  }
};
```

#### Search Movies by Service
```javascript
const searchMoviesByService = async (services, options = {}) => {
  try {
    const response = await axios.get(
      `${STREAMING_API_BASE_URL}/search/movies`,
      {
        params: {
          services: services.join(','),
          country: options.country || 'US',
          type: options.type,
          page: options.page || 1,
          limit: options.limit || 20,
          theme: options.theme || 'light'
        },
        headers: { 'X-API-Key': STREAMING_API_KEY }
      }
    );
    return response.data;
  } catch (error) {
    handleStreamingApiError(error);
  }
};
```

### Error Handling
```javascript
const handleStreamingApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 429:
        // Rate limit exceeded
        const retryAfter = error.response.headers['retry-after'];
        throw new Error(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
      case 401:
        // Invalid API key
        throw new Error('Invalid API key');
      case 404:
        // Movie or region not found
        throw new Error('Resource not found');
      default:
        throw new Error('Streaming API error');
    }
  }
  throw error;
};
```

### Rate Limiting
- 100 requests per minute per API key
- 429 status code when exceeded
- Retry-After header indicates cooldown period

### Caching Guidelines
1. **Cache Duration**
   - Availability data: 6 hours
   - Service lists: 24 hours
   - Search results: 1 hour

2. **Cache Keys**
   ```javascript
   const getCacheKey = (type, params) => {
     switch (type) {
       case 'availability':
         return `streaming:${params.imdbId}:${params.country}:${params.theme}`;
       case 'search':
         return `search:${params.services.join(',')}:${params.country}:${params.page}:${params.theme}`;
       case 'services':
         return `services:${params.country}`;
     }
   };
   ```

### Best Practices
1. **Rate Limit Management**
   - Implement request queuing
   - Use exponential backoff
   - Cache responses
   - Show user feedback

2. **Error Handling**
   - Graceful degradation
   - Clear error messages
   - Fallback options
   - Retry strategies

3. **Performance**
   - Batch requests
   - Cache responses
   - Preload data
   - Lazy loading

4. **Regional Support**
   - Default fallback region
   - Handle missing data
   - Clear messaging
   - Price conversion
