import React, { useState, useEffect } from 'react';
import { STREAMING_SERVICES, STREAMING_COUNTRIES, getServiceInfo, getCountryName } from '../../services/api/streamingConfig';

const StreamingFilter = ({ onFilterChange, defaultCountry = 'US' }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [includeRentals, setIncludeRentals] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('streamingPreferences');
    if (savedPreferences) {
      const { services, country, rentals } = JSON.parse(savedPreferences);
      setSelectedServices(services || []);
      setSelectedCountry(country || defaultCountry);
      setIncludeRentals(rentals || false);
    }
  }, [defaultCountry]);

  // Save preferences to localStorage
  const savePreferences = (services, country, rentals) => {
    localStorage.setItem('streamingPreferences', JSON.stringify({
      services,
      country,
      rentals
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      const newServices = prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId];
      
      onFilterChange({
        services: newServices,
        country: selectedCountry,
        includeRentals
      });

      savePreferences(newServices, selectedCountry, includeRentals);
      return newServices;
    });
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    onFilterChange({
      services: selectedServices,
      country,
      includeRentals
    });
    savePreferences(selectedServices, country, includeRentals);
  };

  const handleRentalToggle = () => {
    const newIncludeRentals = !includeRentals;
    setIncludeRentals(newIncludeRentals);
    onFilterChange({
      services: selectedServices,
      country: selectedCountry,
      includeRentals: newIncludeRentals
    });
    savePreferences(selectedServices, selectedCountry, newIncludeRentals);
  };

  const handleQuickSelect = (preset) => {
    let newServices = [];
    switch (preset) {
      case 'popular':
        newServices = [STREAMING_SERVICES.NETFLIX, STREAMING_SERVICES.PRIME, STREAMING_SERVICES.DISNEY];
        break;
      case 'all':
        newServices = Object.values(STREAMING_SERVICES);
        break;
      case 'none':
        newServices = [];
        break;
      default:
        return;
    }
    setSelectedServices(newServices);
    onFilterChange({
      services: newServices,
      country: selectedCountry,
      includeRentals
    });
    savePreferences(newServices, selectedCountry, includeRentals);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Streaming Services
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => handleQuickSelect('popular')}
            className="text-sm px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Popular
          </button>
          <button
            onClick={() => handleQuickSelect('all')}
            className="text-sm px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            All
          </button>
          <button
            onClick={() => handleQuickSelect('none')}
            className="text-sm px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {Object.values(STREAMING_SERVICES).map(serviceId => {
          const serviceInfo = getServiceInfo(serviceId);
          return (
            <button
              key={serviceId}
              onClick={() => handleServiceToggle(serviceId)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-lg
                transition-all duration-200 hover:transform hover:scale-105
                ${selectedServices.includes(serviceId)
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              <span className="text-2xl mb-1">{serviceInfo.icon}</span>
              <span className="text-sm font-medium truncate w-full text-center">{serviceInfo.name}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Region
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white py-2"
          >
            {Object.entries(STREAMING_COUNTRIES).map(([code, value]) => (
              <option key={code} value={value}>
                {getCountryName(value)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rentals"
            checked={includeRentals}
            onChange={handleRentalToggle}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="rentals" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Include rental/purchase options
          </label>
        </div>
      </div>
    </div>
  );
};

export default StreamingFilter;
