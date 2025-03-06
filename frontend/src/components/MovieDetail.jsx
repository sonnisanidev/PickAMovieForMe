import React, { useState } from 'react';
import { StarIcon, ClockIcon, CalendarIcon } from '@heroicons/react/solid';
import TrailerPlayer from './TrailerPlayer';
import LoadingSpinner from './LoadingSpinner';

const MovieDetail = ({ movie, isLoading }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading movie details..." />;
  }

  if (!movie) {
    return null;
  }

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-16">
      {/* Backdrop Image */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : '/placeholder-backdrop.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        
        {/* Movie Title and Quick Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
              {movie.vote_average?.toFixed(1)}/10
            </span>
            {movie.runtime && (
              <span className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-1" />
                {formatRuntime(movie.runtime)}
              </span>
            )}
            <span className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-1" />
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres?.map(genre => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Overview */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {movie.tagline && (
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Tagline</h3>
              <p className="text-gray-600 dark:text-gray-400 italic">{movie.tagline}</p>
            </div>
          )}
          {movie.production_companies?.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Production</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {movie.production_companies.map(company => company.name).join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setShowTrailer(true)}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg 
                     hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 
                     flex items-center shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Trailer
          </button>
          
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg 
                     hover:bg-yellow-600 transition-colors duration-200 
                     shadow-md hover:shadow-lg"
          >
            IMDb
          </a>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-4xl">
            <TrailerPlayer
              videoKey={movie.videos?.results?.[0]?.key}
              title={movie.title}
              onClose={() => setShowTrailer(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
