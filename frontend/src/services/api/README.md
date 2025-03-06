# API Services Documentation

## Overview
This directory contains API service implementations for the Pick A Movie For Me application.

## Services

### streamingService.js
Handles all streaming availability related API calls and data management.

#### Core Functions

##### `getMovieStreamingInfo`
```javascript
getMovieStreamingInfo(imdbId: string, country?: string): Promise<StreamingInfo>
```
Fetches streaming availability for a specific movie.

**Parameters:**
- `imdbId`: Movie's IMDB ID
- `country`: Optional ISO country code (default: 'US')

**Returns:**
- `StreamingInfo` object with platform availability

##### `searchByStreamingService`
```javascript
searchByStreamingService(options: SearchOptions): Promise<SearchResults>
```
Searches for movies available on specific streaming services.

**Parameters:**
```typescript
interface SearchOptions {
  services: string[];          // Array of service IDs
  country?: string;           // ISO country code
  includeRentals?: boolean;   // Include rental options
  page?: number;             // Page number
  limit?: number;            // Results per page
}
```

**Returns:**
```typescript
interface SearchResults {
  results: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
}
```

##### `getAvailableServices`
```javascript
getAvailableServices(country?: string): Promise<ServiceInfo[]>
```
Gets list of available streaming services for a region.

**Parameters:**
- `country`: ISO country code (default: 'US')

**Returns:**
- Array of `ServiceInfo` objects

#### Cache Management

##### `invalidateCache`
```javascript
invalidateCache(type: 'all' | 'availability' | 'services'): void
```
Invalidates specific cache types.

##### `getCachedData`
```javascript
getCachedData(key: string): Promise<any>
```
Retrieves cached data if available and not expired.

### streamingConfig.js
Configuration and constants for streaming services.

#### Constants

##### `STREAMING_SERVICE_INFO`
```javascript
const STREAMING_SERVICE_INFO = {
  netflix: {
    name: 'Netflix',
    color: 'bg-red-600',
    icon: '🎬',
    types: ['subscription']
  },
  prime: {
    name: 'Prime Video',
    color: 'bg-blue-600',
    icon: '📺',
    types: ['subscription', 'rental', 'purchase']
  },
  // ... other services
};
```

##### `CACHE_DURATIONS`
```javascript
const CACHE_DURATIONS = {
  availability: 6 * 60 * 60 * 1000,  // 6 hours
  services: 24 * 60 * 60 * 1000,     // 24 hours
  search: 60 * 60 * 1000             // 1 hour
};
```

#### Types

##### `StreamingInfo`
```typescript
interface StreamingInfo {
  [serviceId: string]: {
    type: 'subscription' | 'rental' | 'purchase' | 'free';
    quality?: 'SD' | 'HD' | '4K';
    price?: number;
    currency?: string;
    link: string;
    leavingDate?: string;
  };
}
```

##### `ServiceInfo`
```typescript
interface ServiceInfo {
  id: string;
  name: string;
  color: string;
  icon: string;
  types: ('subscription' | 'rental' | 'purchase' | 'free')[];
}
```

### Error Handling

#### `StreamingApiError`
Custom error class for streaming-related errors:
```javascript
class StreamingApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public retryAfter?: number
  ) {
    super(message);
    this.name = 'StreamingApiError';
  }
}
```

#### Error Codes
- `rate_limit_exceeded`: API rate limit reached
- `invalid_api_key`: Invalid or missing API key
- `region_not_supported`: Region not supported
- `service_unavailable`: Service temporarily unavailable

### Usage Examples

#### Fetch Movie Availability
```javascript
try {
  const streamingInfo = await getMovieStreamingInfo('tt1234567', 'US');
  console.log('Available on:', Object.keys(streamingInfo));
} catch (error) {
  if (error instanceof StreamingApiError) {
    handleStreamingError(error);
  }
}
```

#### Search with Filters
```javascript
try {
  const results = await searchByStreamingService({
    services: ['netflix', 'prime'],
    country: 'US',
    includeRentals: true,
    page: 1,
    limit: 20
  });
  console.log(`Found ${results.totalResults} movies`);
} catch (error) {
  handleSearchError(error);
}
```

### Best Practices

1. **Error Handling**
   - Always catch and handle errors appropriately
   - Use the custom `StreamingApiError` class
   - Provide clear error messages to users
   - Implement retry logic for recoverable errors

2. **Caching**
   - Use cache for frequently accessed data
   - Respect cache durations
   - Implement cache invalidation
   - Handle cache misses gracefully

3. **Rate Limiting**
   - Monitor API usage
   - Implement request queuing
   - Use exponential backoff
   - Show appropriate user feedback

4. **Regional Support**
   - Always provide fallback regions
   - Handle region-specific pricing
   - Clear messaging for unavailable regions
   - Support multiple currencies
