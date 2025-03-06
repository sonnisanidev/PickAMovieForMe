import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MoodSelector from '../MoodSelector/MoodSelector';
import MovieList from '../MovieList/MovieList';
import GenreFilter from '../GenreFilter/GenreFilter';
import StreamingFilter from '../StreamingFilter/StreamingFilter';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { movieService } from '../../services/api/movieService';

const MovieBrowser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // State from URL parameters
  const [selectedMood, setSelectedMood] = useState(searchParams.get('mood') || '');
  const [selectedGenres, setSelectedGenres] = useState(
    searchParams.get('genres')?.split(',').filter(Boolean) || []
  );
  const [streamingFilters, setStreamingFilters] = useState({
    services: searchParams.get('services')?.split(',').filter(Boolean) || [],
    country: searchParams.get('country') || 'US',
    includeRentals: searchParams.get('rentals') === 'true'
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedMood) params.set('mood', selectedMood);
    if (selectedGenres.length) params.set('genres', selectedGenres.join(','));
    if (streamingFilters.services.length) params.set('services', streamingFilters.services.join(','));
    if (streamingFilters.country !== 'US') params.set('country', streamingFilters.country);
    if (streamingFilters.includeRentals) params.set('rentals', 'true');
    setSearchParams(params);
  }, [selectedMood, selectedGenres, streamingFilters, setSearchParams]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, [selectedMood, selectedGenres, streamingFilters]);

  // Fetch movies based on filters
  const fetchMovies = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Get movie recommendations based on mood and genres
      const { results, totalPages } = await movieService.getRecommendations({
        mood: selectedMood,
        genres: selectedGenres,
        page: currentPage
      });

      // Update movies state based on page
      setMovies(prev => currentPage === 1 ? results : [...prev, ...results]);
      setHasMore(currentPage < totalPages);
    } catch (err) {
      setError('Failed to fetch movie recommendations');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load more movies when reaching the bottom
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMovies();
  }, [selectedMood, selectedGenres]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleGenreChange = (genres) => {
    setSelectedGenres(genres);
  };

  const handleStreamingFilterChange = (filters) => {
    setStreamingFilters(filters);
  };

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900 rounded-lg">
        <p className="font-medium">{error}</p>
        <button 
          onClick={() => fetchMovies(page)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-4">
              <MoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />
              <GenreFilter
                selectedGenres={selectedGenres}
                onChange={handleGenreChange}
              />
              <StreamingFilter
                onFilterChange={handleStreamingFilterChange}
                defaultCountry={streamingFilters.country}
              />
            </div>
          </div>

          {/* Movie List */}
          <div className="lg:col-span-3">
            {movies.length > 0 ? (
              <>
                <MovieList
                  movies={movies}
                  selectedCountry={streamingFilters.country}
                />
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className={`
                        px-6 py-3 rounded-lg text-white font-medium
                        ${loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                        }
                        transition-colors duration-200
                      `}
                    >
                      {loading ? 'Loading...' : 'Load More Movies'}
                    </button>
                  </div>
                )}
              </>
            ) : loading ? (
              <LoadingSpinner />
            ) : (
              <div className="text-center text-gray-500">
                <p>No movies found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default MovieBrowser;
