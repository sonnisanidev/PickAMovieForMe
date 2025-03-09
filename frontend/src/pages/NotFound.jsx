import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <span className="text-6xl animate-bounce">🎬</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          404 - Scene Not Found
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Looks like this scene didn't make the final cut. Let's get you back to the main feature!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Back to Home
          </button>
          
          <button
            onClick={() => navigate('/browse')}
            className="btn btn-secondary"
          >
            Browse Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
