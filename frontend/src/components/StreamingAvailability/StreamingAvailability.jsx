import React, { useState, useEffect } from 'react';
import { streamingService } from '../../services/api/streamingService';
import { getServiceInfo } from '../../services/api/streamingConfig';

const StreamingAvailability = ({ imdbId, country }) => {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await streamingService.getMovieAvailability(imdbId, country);
        setAvailability(data?.streamingInfo || {});
      } catch (err) {
        setError('Failed to fetch streaming availability');
        console.error('Error fetching streaming availability:', err);
      } finally {
        setLoading(false);
      }
    };

    if (imdbId && country) {
      fetchAvailability();
    }
  }, [imdbId, country]);

  if (loading) {
    return (
      <div className="animate-pulse flex space-x-4 p-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (!availability || Object.keys(availability).length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400 p-4">
        No streaming options available in your region
      </div>
    );
  }

  const renderServiceOption = (service, options) => {
    const serviceInfo = getServiceInfo(service);
    
    return (
      <div 
        key={service}
        className={`flex items-center justify-between p-3 rounded-lg mb-2 ${serviceInfo.color} bg-opacity-10`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{serviceInfo.icon}</span>
          <span className={`font-medium ${serviceInfo.textColor}`}>
            {serviceInfo.name}
          </span>
        </div>
        <div className="text-sm">
          {options.type === 'subscription' ? (
            <span className="px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
              Included
            </span>
          ) : (
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              {options.price} {options.currency}
            </span>
          )}
          {options.leaving && (
            <span className="ml-2 px-2 py-1 rounded bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
              Leaving {new Date(options.leaving).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Streaming Options
      </h3>
      <div className="space-y-2">
        {Object.entries(availability).map(([service, options]) => 
          renderServiceOption(service, options)
        )}
      </div>
    </div>
  );
};

export default StreamingAvailability;
