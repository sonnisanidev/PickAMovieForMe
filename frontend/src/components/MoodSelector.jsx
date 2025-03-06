import React from 'react';

const moods = [
  { id: 'happy', label: 'Happy', emoji: '😊', genres: ['comedy', 'animation', 'family'] },
  { id: 'sad', label: 'Sad', emoji: '😢', genres: ['drama', 'romance'] },
  { id: 'excited', label: 'Excited', emoji: '🤩', genres: ['action', 'adventure', 'sci-fi'] },
  { id: 'scared', label: 'Scared', emoji: '😱', genres: ['horror', 'thriller'] },
  { id: 'romantic', label: 'Romantic', emoji: '🥰', genres: ['romance', 'drama'] },
  { id: 'thoughtful', label: 'Thoughtful', emoji: '🤔', genres: ['documentary', 'drama', 'mystery'] }
];

const MoodSelector = ({ onMoodSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood)}
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md 
                   hover:shadow-lg transition-shadow duration-200 space-y-2 hover:bg-gray-50"
        >
          <span className="text-4xl">{mood.emoji}</span>
          <span className="text-lg font-medium text-gray-800">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
