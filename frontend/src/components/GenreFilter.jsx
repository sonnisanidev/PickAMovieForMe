import React from 'react';

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' }
];

const GenreFilter = ({ selectedGenres, onGenreSelect }) => {
  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreSelect(selectedGenres.filter(id => id !== genreId));
    } else {
      onGenreSelect([...selectedGenres, genreId]);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter by Genre</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${selectedGenres.includes(genre.id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
