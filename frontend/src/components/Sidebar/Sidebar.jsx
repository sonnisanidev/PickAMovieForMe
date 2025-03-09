import React, { useState } from 'react';
import { STREAMING_SERVICES, STREAMING_SERVICE_INFO } from '../../services/api/streamingConfig';

const Sidebar = ({ onStreamingFilterChange }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) => {
      const newSelection = prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service];
      
      onStreamingFilterChange(newSelection);
      return newSelection;
    });
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Streaming Services
      </h2>
      
      <div className="space-y-2">
        {Object.values(STREAMING_SERVICES).map((service) => {
          const serviceInfo = STREAMING_SERVICE_INFO[service];
          const isSelected = selectedServices.includes(service);
          
          return (
            <button
              key={service}
              onClick={() => handleServiceToggle(service)}
              className={`
                w-full flex items-center p-2 rounded-md transition-colors
                ${isSelected 
                  ? `${serviceInfo.color} ${serviceInfo.textColor}`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              <span className="mr-2">{serviceInfo.icon}</span>
              <span>{serviceInfo.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
