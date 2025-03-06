import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoodSelector } from '../components';

const Home = () => {
  const navigate = useNavigate();

  const handleMoodSelect = (mood) => {
    // Navigate to movie browser with selected mood
    navigate('/browse', { state: { mood } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Pick A Movie For Me
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect movie based on your mood. Select how you're feeling,
            and we'll find movies that match your vibe.
          </p>
        </div>

        {/* Mood Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            How are you feeling today?
          </h2>
          <MoodSelector onMoodSelect={handleMoodSelect} />
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎭</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Mood-Based</h3>
            <p className="text-gray-600">Find movies that match exactly how you're feeling</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
            <p className="text-gray-600">Carefully selected movies from various genres</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Watch Instantly</h3>
            <p className="text-gray-600">View trailers and start watching right away</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
