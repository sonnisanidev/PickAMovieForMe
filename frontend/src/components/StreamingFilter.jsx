import React from 'react';
import { STREAMING_SERVICE_INFO, STREAMING_COUNTRIES } from '../services/api/streamingConfig';

const StreamingFilter = ({ 
  selectedServices, 
  onServiceChange, 
  selectedCountry, 
  onCountryChange,
  includeRentals = true,
  onRentalChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">Streaming Filters</h3>
      
      {/* Country Selection */}
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Region
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {Object.entries(STREAMING_COUNTRIES).map(([code, value]) => (
            <option key={code} value={value}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {/* Streaming Services */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Streaming Services
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(STREAMING_SERVICE_INFO).map(([serviceId, service]) => (
            <div key={serviceId} className="flex items-center">
              <input
                type="checkbox"
                id={serviceId}
                checked={selectedServices.includes(serviceId)}
                onChange={() => {
                  const newServices = selectedServices.includes(serviceId)
                    ? selectedServices.filter(s => s !== serviceId)
                    : [...selectedServices, serviceId];
                  onServiceChange(newServices);
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={serviceId} className="ml-2 flex items-center text-sm text-gray-700">
                <span className="mr-1">{service.icon}</span>
                {service.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Options */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <label htmlFor="rentals" className="text-sm font-medium text-gray-700">
          Include Rentals/Purchases
        </label>
        <button
          type="button"
          role="switch"
          aria-checked={includeRentals}
          onClick={() => onRentalChange(!includeRentals)}
          className={`${
            includeRentals ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span className="sr-only">Include rental options</span>
          <span
            aria-hidden="true"
            className={`${
              includeRentals ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </button>
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={() => onServiceChange(Object.keys(STREAMING_SERVICE_INFO))}
          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-full border border-blue-200"
        >
          Select All
        </button>
        <button
          onClick={() => onServiceChange([])}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-full border border-gray-200"
        >
          Clear All
        </button>
        <button
          onClick={() => {
            onServiceChange(['netflix', 'prime', 'disney', 'hulu']);
            onRentalChange(false);
          }}
          className="px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded-full border border-purple-200"
        >
          Subscriptions Only
        </button>
      </div>
    </div>
  );
};

export default StreamingFilter;
