import React, { useState, useEffect } from 'react';
import { streamingService } from '../services/api/streamingService';
import { STREAMING_SERVICE_INFO, STREAMING_COUNTRIES } from '../services/api/streamingConfig';
import { LoadingSpinner } from './';

const StreamingAvailability = ({ imdbId, country = STREAMING_COUNTRIES.US }) => {
  const [availability, setAvailability] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(country);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await streamingService.getMovieAvailability(imdbId, selectedCountry);
        setAvailability(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (imdbId) {
      fetchAvailability();
    }
  }, [imdbId, selectedCountry]);

  if (isLoading) {
    return <LoadingSpinner size="small" message="Checking streaming availability..." />;
  }

  if (error) {
    return (
      <div className="text-gray-500 text-sm">
        Unable to fetch streaming availability at this time.
      </div>
    );
  }

  if (!availability?.streamingInfo || Object.keys(availability.streamingInfo).length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-center text-gray-500">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Not available for streaming in your region</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Where to Watch</h3>
      
      {/* Country Selector */}
      <div className="mb-4">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {Object.entries(STREAMING_COUNTRIES).map(([code, value]) => (
            <option key={code} value={value}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {/* Streaming Services List */}
      <div className="space-y-3">
        {Object.entries(availability.streamingInfo).map(([service, info]) => {
          const serviceInfo = STREAMING_SERVICE_INFO[service];
          const isLeavingSoon = streamingService.getLeavingDate(availability.streamingInfo, service);
          
          return (
            <div key={service} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2">{serviceInfo.icon}</span>
                <span className="font-medium">{serviceInfo.name}</span>
                {isLeavingSoon && (
                  <span className="ml-2 text-xs text-red-600 font-medium">
                    Leaving {new Date(isLeavingSoon).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              <a
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1 rounded-full text-white text-sm ${serviceInfo.color} hover:opacity-90 transition-opacity`}
              >
                {info.price ? `Rent $${info.price}` : 'Watch Now'}
              </a>
            </div>
          );
        })}
      </div>

      {/* Best Option */}
      {streamingService.isStreamingAvailable(availability.streamingInfo) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Best Option: {STREAMING_SERVICE_INFO[Object.keys(availability.streamingInfo)[0]].name}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-4 text-xs text-gray-400">
        Last updated: {new Date(availability.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  );
};

export default StreamingAvailability;
