# Services Directory

This directory contains all the service layers for the Pick A Movie For Me application.

## API Services

### TMDB Service (`api/tmdbService.js`)
Handles all interactions with the TMDB API:
- Movie details and recommendations
- Mood-based movie discovery
- Search functionality
- Genre listings
- Trending movies

### Streaming Service (`api/streamingService.js`)
Manages streaming availability data:
- Real-time streaming platform availability
- Pricing information
- Regional availability
- Best viewing options
- Cache management

### API Configuration
- `api/config.js`: TMDB API configuration
- `api/streamingConfig.js`: Streaming API configuration
- Image URL construction
- Headers and authentication
- Mood to genre mapping
- Streaming service definitions

## Data Services

### Movie Service (`movieService.js`)
Handles movie data processing:
- Data formatting and normalization
- Response transformation
- Local storage caching
- Recent movies tracking

### Storage Service (Part of `movieService.js`)
Local storage management:
- Movie details caching
- Recent movies history
- Genre caching
- Cache expiration handling
- Streaming availability caching

## Utility Services

### Utils (`utils.js`)
Common utility functions:
- Time and date formatting
- Input validation
- Error message handling
- Debounce functionality
- Scroll helpers
- URL parameter management
- Array manipulation
- Analytics tracking (placeholder)

## Implementation Details

### Error Handling
- Consistent error format
- Network error handling
- API error processing
- User-friendly error messages

### Caching Strategy
- 24-hour cache duration
- Automatic cache invalidation
- Memory efficient storage
- Optimized for performance

### API Integration
- Axios for HTTP requests
- Response interceptors
- Error interceptors
- Request timeout handling

## Usage Examples

### TMDB Service
```javascript
// Get movies by mood
const movies = await tmdbService.getMoviesByMood('happy');

// Get movie details
const movie = await tmdbService.getMovieDetails(movieId);

// Search movies
const results = await tmdbService.searchMovies('query');
```

### Streaming Service
```javascript
// Get streaming availability
const availability = await streamingService.getMovieAvailability('tt1234567', 'us');

// Check best streaming option
const bestOption = streamingService.getBestStreamingOption(availability.streamingInfo);

// Check if leaving soon
const isLeaving = streamingService.isLeavingSoon(availability.streamingInfo);
```

### Movie Service
```javascript
// Format movie data
const formattedMovie = formatMovieData(movieData);

// Cache movie details
storageService.cacheMovie(movieData);

// Get cached movie
const cachedMovie = storageService.getCachedMovie(movieId);
```

### Utils
```javascript
// Format runtime
const duration = formatRuntime(142); // "2h 22m"

// Debounce search
const debouncedSearch = debounce(searchFunction, 300);

// Validate input
const isValid = validators.isValidYear(2024);
