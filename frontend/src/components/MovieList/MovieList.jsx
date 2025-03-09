import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = ({ movies, currentPage, totalPages, onPageChange, selectedCountry }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 dark:text-gray-400">
          No movies found matching your criteria.
          <br />
          Try adjusting your mood, genre, or streaming filters.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            selectedCountry={selectedCountry}
          />
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 pt-8">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Previous Page
          </button>
        )}
        
        <span className="text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;
