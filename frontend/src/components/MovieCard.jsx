import React from 'react';
import { Link } from 'react-router-dom';
import { STREAMING_SERVICE_INFO } from '../services/api/streamingConfig';

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    posterPath,
    releaseYear,
    voteAverage,
    genres,
    streamingInfo
  } = movie;

  // Get available streaming services
  const availableServices = streamingInfo ? Object.keys(streamingInfo) : [];
  const hasSubscriptionService = availableServices.some(
    service => !streamingInfo[service].price
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
      {/* Poster */}
      <Link to={`/movie/${id}`} className="block relative">
        <img
          src={posterPath || '/placeholder-poster.jpg'}
          alt={`${title} Poster`}
          className="w-full h-[360px] object-cover"
        />
        
        {/* Streaming Availability Indicator */}
        {availableServices.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {availableServices.slice(0, 3).map(service => {
              const serviceInfo = STREAMING_SERVICE_INFO[service];
              const isRental = streamingInfo[service].price;
              
              return (
                <div
                  key={service}
                  className={`${serviceInfo.color} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-md`}
                >
                  <span className="mr-1">{serviceInfo.icon}</span>
                  {isRental ? '💰' : '✓'}
                </div>
              );
            })}
            {availableServices.length > 3 && (
              <div className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-medium text-center shadow-md">
                +{availableServices.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Rating Badge */}
        {voteAverage > 0 && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-sm font-medium">
            ⭐ {voteAverage.toFixed(1)}
          </div>
        )}
      </Link>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{releaseYear}</span>
          {hasSubscriptionService && (
            <span className="text-green-600 font-medium flex items-center">
              <span className="mr-1">📺</span>
              Included
            </span>
          )}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1">
          {genres?.slice(0, 3).map(genre => (
            <span
              key={genre.id}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <Link
          to={`/movie/${id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          More Info
        </Link>
        {availableServices.length > 0 && (
          <Link
            to={`/movie/${id}#watch`}
            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
          >
            <span className="mr-1">Watch Now</span>
            <span>→</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
