import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { movieService } from '../../services/api/movieService';

const GenreFilter = ({ selectedGenres = [], onChange, disabled = false }) => {
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: () => movieService.getGenres(),
  });

  const handleGenreClick = (genre) => {
    if (disabled) return;
    
    const isSelected = selectedGenres.includes(genre);
    if (isSelected) {
      onChange(selectedGenres.filter(g => g !== genre));
    } else {
      onChange([...selectedGenres, genre]);
    }
  };

  if (isLoading) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Filter by Genre
      </h3>
      <div className="flex flex-wrap gap-2">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            disabled={disabled}
            className={`px-3 py-1 rounded-full text-sm transition-colors
              ${selectedGenres.includes(genre)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {genre}
          </button>
        ))}
      </div>
      {disabled && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Genre filter is disabled when a mood is selected
        </p>
      )}
    </div>
  );
};

export default React.memo(GenreFilter);
