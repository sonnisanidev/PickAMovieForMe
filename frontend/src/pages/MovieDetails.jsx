import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieDetail, LoadingSpinner, ErrorBoundary } from '../components';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Fixed Back Button */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700"
            aria-label="Back to previous page"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 max-w-lg mx-auto text-center">
            <svg
              className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {error === 'Movie not found' ? 'Movie Not Found' : 'Error Loading Movie'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {error === 'Movie not found'
                ? "We couldn't find the movie you're looking for."
                : 'There was a problem loading the movie details.'}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/browse')}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Browse Movies
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <ErrorBoundary>
            <MovieDetail movie={movie} isLoading={isLoading} />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
