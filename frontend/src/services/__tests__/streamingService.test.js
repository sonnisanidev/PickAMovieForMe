import {
  getMovieStreamingInfo,
  searchByStreamingService,
  getAvailableServices,
  invalidateCache,
  getCachedData
} from '../api/streamingService';
import { StreamingApiError } from '../api/errors';
import mockAxios from 'jest-mock-axios';

describe('Streaming Service', () => {
  const mockStreamingData = {
    netflix: {
      type: 'subscription',
      quality: 'HD',
      link: 'https://netflix.com/watch/123',
      leavingDate: '2025-04-01'
    },
    prime: {
      type: 'rental',
      quality: '4K',
      price: 3.99,
      currency: 'USD',
      link: 'https://amazon.com/rent/123'
    }
  };

  beforeEach(() => {
    mockAxios.reset();
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('getMovieStreamingInfo', () => {
    it('fetches streaming info for a movie', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: mockStreamingData });

      const result = await getMovieStreamingInfo('tt1234567', 'US');
      expect(result).toEqual(mockStreamingData);
      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/movie/tt1234567/availability'),
        expect.any(Object)
      );
    });

    it('uses cache for repeated requests', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: mockStreamingData });

      // First call
      await getMovieStreamingInfo('tt1234567', 'US');
      expect(mockAxios.get).toHaveBeenCalledTimes(1);

      // Second call - should use cache
      const result = await getMovieStreamingInfo('tt1234567', 'US');
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStreamingData);
    });

    it('handles region-specific data', async () => {
      const usData = { ...mockStreamingData };
      const gbData = {
        ...mockStreamingData,
        prime: { ...mockStreamingData.prime, currency: 'GBP', price: 2.99 }
      };

      mockAxios.get
        .mockResolvedValueOnce({ data: usData })
        .mockResolvedValueOnce({ data: gbData });

      const usResult = await getMovieStreamingInfo('tt1234567', 'US');
      const gbResult = await getMovieStreamingInfo('tt1234567', 'GB');

      expect(usResult.prime.currency).toBe('USD');
      expect(gbResult.prime.currency).toBe('GBP');
    });

    it('handles API errors', async () => {
      mockAxios.get.mockRejectedValueOnce({
        response: {
          status: 429,
          headers: { 'retry-after': '60' }
        }
      });

      await expect(getMovieStreamingInfo('tt1234567'))
        .rejects
        .toThrow(StreamingApiError);
    });
  });

  describe('searchByStreamingService', () => {
    const mockSearchResults = {
      results: [
        {
          imdbId: 'tt1234567',
          title: 'Test Movie',
          streamingInfo: mockStreamingData
        }
      ],
      page: 1,
      totalPages: 10,
      totalResults: 100
    };

    it('searches movies by streaming service', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: mockSearchResults });

      const result = await searchByStreamingService({
        services: ['netflix', 'prime'],
        country: 'US'
      });

      expect(result).toEqual(mockSearchResults);
      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/search/movies'),
        expect.objectContaining({
          params: expect.objectContaining({
            services: 'netflix,prime',
            country: 'US'
          })
        })
      );
    });

    it('filters by subscription type', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: mockSearchResults });

      await searchByStreamingService({
        services: ['netflix'],
        includeRentals: false
      });

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            type: 'subscription'
          })
        })
      );
    });

    it('handles pagination', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: mockSearchResults });

      await searchByStreamingService({
        services: ['netflix'],
        page: 2,
        limit: 20
      });

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            page: 2,
            limit: 20
          })
        })
      );
    });
  });

  describe('Cache Management', () => {
    it('invalidates specific cache types', async () => {
      // Populate cache
      mockAxios.get.mockResolvedValueOnce({ data: mockStreamingData });
      await getMovieStreamingInfo('tt1234567', 'US');

      // Verify cache exists
      expect(getCachedData('streaming:tt1234567:US')).toBeTruthy();

      // Invalidate cache
      invalidateCache('availability');

      // Verify cache is cleared
      expect(getCachedData('streaming:tt1234567:US')).toBeNull();
    });

    it('respects cache duration', async () => {
      jest.useFakeTimers();

      mockAxios.get.mockResolvedValueOnce({ data: mockStreamingData });
      await getMovieStreamingInfo('tt1234567', 'US');

      // Advance time by 7 hours (beyond 6-hour cache duration)
      jest.advanceTimersByTime(7 * 60 * 60 * 1000);

      // Should make new API call
      await getMovieStreamingInfo('tt1234567', 'US');
      expect(mockAxios.get).toHaveBeenCalledTimes(2);

      jest.useRealTimers();
    });
  });

  describe('Error Handling', () => {
    it('handles rate limiting', async () => {
      mockAxios.get.mockRejectedValueOnce({
        response: {
          status: 429,
          headers: { 'retry-after': '60' }
        }
      });

      await expect(getMovieStreamingInfo('tt1234567'))
        .rejects
        .toThrow('Rate limit exceeded');
    });

    it('handles invalid API key', async () => {
      mockAxios.get.mockRejectedValueOnce({
        response: { status: 401 }
      });

      await expect(getMovieStreamingInfo('tt1234567'))
        .rejects
        .toThrow('Invalid API key');
    });

    it('handles network errors', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(getMovieStreamingInfo('tt1234567'))
        .rejects
        .toThrow('Network Error');
    });
  });

  describe('Performance', () => {
    it('batches multiple requests', async () => {
      const movies = ['tt1111111', 'tt2222222', 'tt3333333'];
      const promises = movies.map(id => getMovieStreamingInfo(id, 'US'));

      mockAxios.get.mockResolvedValue({ data: mockStreamingData });
      await Promise.all(promises);

      // Should make one batch request instead of three
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/movies/batch'),
        expect.any(Object)
      );
    });

    it('optimizes repeated region switches', async () => {
      mockAxios.get
        .mockResolvedValueOnce({ data: mockStreamingData })
        .mockResolvedValueOnce({ data: mockStreamingData });

      // Initial US request
      await getMovieStreamingInfo('tt1234567', 'US');
      
      // Switch to GB
      await getMovieStreamingInfo('tt1234567', 'GB');
      
      // Switch back to US - should use cache
      await getMovieStreamingInfo('tt1234567', 'US');

      expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });
  });
});
