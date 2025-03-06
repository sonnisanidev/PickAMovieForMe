import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <span className="text-6xl">🎬</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - Scene Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Looks like this scene didn't make the final cut. Let's get you back to the main feature!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors duration-200"
          >
            Back to Home
          </button>
          
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
                     transition-colors duration-200"
          >
            Browse Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
