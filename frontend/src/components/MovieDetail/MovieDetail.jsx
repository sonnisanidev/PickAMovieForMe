import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../../services/api/movieService';
import StreamingAvailability from '../StreamingAvailability/StreamingAvailability';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovieDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError('Failed to fetch movie details');
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (loading) {
    return (
      <>
        <button
          onClick={() => navigate(-1)}
          className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700"
          aria-label="Back to previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <button
          onClick={() => navigate(-1)}
          className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700"
          aria-label="Back to previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
        <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mt-16">
          <p className="font-medium">{error}</p>
          <button 
            onClick={fetchMovieDetails}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <button
          onClick={() => navigate(-1)}
          className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700"
          aria-label="Back to previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>
        <div className="text-center text-gray-500 mt-16">
          <p>Movie not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700"
        aria-label="Back to previous page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back</span>
      </button>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{movie.title}</h1>
            
            {/* Release Date and Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-600 dark:text-gray-400">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="text-yellow-500">
                ★ {movie.vote_average.toFixed(1)}
              </span>
            </div>

            {/* Overview */}
            <p className="text-gray-700 dark:text-gray-300 mb-6">{movie.overview}</p>

            {/* Genres */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Streaming Availability */}
            {movie.imdbId && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Where to Watch</h2>
                <StreamingAvailability imdbId={movie.imdbId} />
              </div>
            )}

            {/* Videos/Trailers */}
            {movie.videos?.results?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Videos</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                    title="Movie Trailer"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Cast */}
            {movie.credits?.cast?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Cast</h2>
                <div className="flex flex-wrap gap-4">
                  {movie.credits.cast.slice(0, 6).map(person => (
                    <div key={person.id} className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt={person.name}
                        className="w-24 h-24 rounded-full object-cover mb-2"
                        onError={(e) => {
                          e.target.src = '/placeholder-avatar.png';
                        }}
                      />
                      <p className="font-medium text-gray-900 dark:text-gray-100">{person.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
