import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = ({ movies, selectedCountry }) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          selectedCountry={selectedCountry}
        />
      ))}
    </div>
  );
};

export default MovieList;
