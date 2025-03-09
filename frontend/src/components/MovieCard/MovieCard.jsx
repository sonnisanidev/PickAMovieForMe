import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    posterPath,
    releaseDate,
    voteAverage
  } = movie;

  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const rating = voteAverage ? Math.round(voteAverage * 10) / 10 : '';

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/movie/${id}`} className="block">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700">
          {posterPath ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">No poster available</span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{year}</span>
            {rating && (
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{rating}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
