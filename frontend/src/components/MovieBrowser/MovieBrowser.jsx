import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import MoodSelector from '../MoodSelector/MoodSelector';
import MovieList from '../MovieList/MovieList';
import GenreFilter from '../GenreFilter/GenreFilter';
import SortingFilter from '../SortingFilter/SortingFilter';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { movieService } from '../../services/api/movieService';

const MovieBrowser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);

  // Get mood from either location state or search params
  const moodFromState = location.state?.mood;
  const moodFromParams = searchParams.get('mood');

  // If no mood is set, redirect to home
  useEffect(() => {
    if (!moodFromState && !moodFromParams) {
      navigate('/', { replace: true });
    }
  }, [moodFromState, moodFromParams, navigate]);

  // State from URL parameters
  const [selectedMood, setSelectedMood] = useState(moodFromState || moodFromParams || '');
  const [selectedGenres, setSelectedGenres] = useState(
    searchParams.get('genres')?.split(',').filter(Boolean) || []
  );
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || 'popularity.desc');

  // Memoize URL parameter update logic
  const updateUrlParams = useCallback((mood, genres, sort, page) => {
    const params = new URLSearchParams();
    if (mood) params.set('mood', mood);
    if (genres.length) params.set('genres', genres.join(','));
    if (sort) params.set('sort', sort);
    params.set('page', page.toString());
    setSearchParams(params);
  }, [setSearchParams]);

  // Update URL when filters change
  useEffect(() => {
    updateUrlParams(selectedMood, selectedGenres, selectedSort, currentPage);
  }, [selectedMood, selectedGenres, selectedSort, currentPage, updateUrlParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMood, selectedGenres, selectedSort]);

  // Memoize movie fetch function
  const fetchMovies = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const { results, totalPages: total } = await movieService.getRecommendations({
        mood: selectedMood,
        genres: selectedGenres,
        sort: selectedSort,
        page
      });

      setMovies(results);
      setTotalPages(total);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch movie recommendations');
      console.error('Error fetching movies:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  }, [selectedMood, selectedGenres, selectedSort]);

  // Fetch movies when filters or page changes
  useEffect(() => {
    if (selectedMood || selectedGenres.length > 0) {
      fetchMovies(currentPage);
    }
  }, [selectedMood, selectedGenres, selectedSort, currentPage, fetchMovies]);

  // Memoize handler functions
  const handleMoodSelect = useCallback((mood) => {
    setSelectedMood(mood);
    setSelectedGenres([]);
  }, []);

  const handleGenreChange = useCallback((genres) => {
    setSelectedGenres(genres);
    setSelectedMood('');
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSelectedSort(sort);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900 rounded-lg">
        <p className="font-medium">{error}</p>
        <button 
          onClick={() => fetchMovies(currentPage)}
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
                disabled={!!selectedMood}
              />
              <SortingFilter
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Movie List */}
          <div className="lg:col-span-3">
            {loading ? (
              <LoadingSpinner />
            ) : movies.length > 0 ? (
              <MovieList
                movies={movies}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
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

export default React.memo(MovieBrowser);
