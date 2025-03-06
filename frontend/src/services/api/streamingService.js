import axios from 'axios';
import { STREAMING_ENDPOINTS, STREAMING_HEADERS } from './streamingConfig';
import { storageService } from '../movieService';

// Create axios instance for streaming API
const streamingApi = axios.create({
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  },
  timeout: 10000
});

// Error handler
const handleError = (error) => {
  const errorResponse = {
    message: 'Error fetching streaming availability',
    status: error.response?.status || 500,
    details: error.response?.data || error.message
  };
  console.error('Streaming API Error:', errorResponse);
  throw errorResponse;
};

// Response interceptor
streamingApi.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(handleError(error))
);

// Cache key generator
const getCacheKey = (imdbId, country) => `streaming_${imdbId}_${country}`;

export const streamingService = {
  // Get streaming availability for a movie
  async getMovieAvailability(imdbId, country = 'US') {
    try {
      // Check cache first
      const cacheKey = getCacheKey(imdbId, country);
      const cachedData = storageService.getItem(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const response = await streamingApi.get('https://streaming-availability.p.rapidapi.com/get', {
        params: {
          imdb_id: imdbId,
          output_language: 'en',
          country: country.toLowerCase()
        }
      });

      // Format and cache the response
      const formattedData = this.formatAvailabilityData(response.result);
      storageService.setItem(cacheKey, formattedData);

      return formattedData;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Search for movies with streaming availability
  async searchWithAvailability(query, country = 'US') {
    try {
      const response = await streamingApi.get(STREAMING_ENDPOINTS.SEARCH_TITLES, {
        params: {
          query,
          country,
          show_type: 'movie',
          output_language: 'en'
        }
      });

      return response.results.map(this.formatAvailabilityData);
    } catch (error) {
      throw handleError(error);
    }
  },

  // Format streaming availability data
  formatAvailabilityData(data) {
    if (!data) return null;

    const streamingInfo = {};
    
    // Process streaming services
    Object.entries(data.streamingInfo || {}).forEach(([service, info]) => {
      const serviceDetails = info[0]; // Get the first availability option
      streamingInfo[service.toLowerCase()] = {
        type: serviceDetails.type, // subscription or rent
        quality: serviceDetails.quality,
        price: serviceDetails.price?.amount,
        currency: serviceDetails.price?.currency,
        link: serviceDetails.link,
        leaving: serviceDetails.leaving,
        availableSince: serviceDetails.availableSince
      };
    });

    return {
      imdbId: data.imdbId,
      tmdbId: data.tmdbId,
      streamingInfo,
      lastUpdated: new Date().toISOString()
    };
  },

  // Get best streaming option based on quality and price
  getBestStreamingOption(streamingInfo) {
    if (!streamingInfo) return null;

    const options = Object.entries(streamingInfo).map(([service, info]) => ({
      service,
      ...info
    }));

    // Sort by quality and price (if available)
    return options.sort((a, b) => {
      // Prioritize higher quality
      if (a.quality !== b.quality) {
        return b.quality.localeCompare(a.quality);
      }
      // Then lower price if available
      if (a.price && b.price) {
        return a.price - b.price;
      }
      // Subscription services (no price) come first
      if (!a.price && b.price) return -1;
      if (a.price && !b.price) return 1;
      return 0;
    })[0];
  },

  // Check if movie is available on any streaming service
  isStreamingAvailable(streamingInfo) {
    return streamingInfo && Object.keys(streamingInfo).length > 0;
  },

  // Get all streaming services where the movie is available
  getAvailableServices(streamingInfo) {
    if (!streamingInfo) return [];
    return Object.keys(streamingInfo);
  },

  // Check if movie is leaving soon from any service
  isLeavingSoon(streamingInfo) {
    if (!streamingInfo) return false;
    
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    return Object.values(streamingInfo).some(info => {
      return info.leaving && new Date(info.leaving) <= thirtyDaysFromNow;
    });
  },

  // Get leaving date for a specific service
  getLeavingDate(streamingInfo, service) {
    if (!streamingInfo?.[service]?.leaving) return null;
    return new Date(streamingInfo[service].leaving);
  },

  // Clear streaming availability cache
  clearCache() {
    const cacheKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('streaming_')
    );
    cacheKeys.forEach(key => localStorage.removeItem(key));
  }
};
