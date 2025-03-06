import React from 'react';

const moods = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'excited', emoji: '🤩', label: 'Excited' },
  { id: 'scared', emoji: '😱', label: 'Scared' },
  { id: 'relaxed', emoji: '😌', label: 'Relaxed' }
];

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        How are you feeling?
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {moods.map(({ id, emoji, label }) => (
          <button
            key={id}
            onClick={() => onMoodSelect(id)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-lg
              transition-all duration-200 hover:transform hover:scale-105
              ${selectedMood === id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            <span className="text-2xl mb-1">{emoji}</span>
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
