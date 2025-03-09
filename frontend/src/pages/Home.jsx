import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tmdbService } from '../services/api/tmdbService';
import { MoodSelector } from '../components';

const Home = () => {
  const navigate = useNavigate();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const { results } = await tmdbService.getTrendingMovies('week', 1);
        setFeaturedMovies(results.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  const handleMoodSelect = (mood) => {
    // Navigate to movie browser with mood state and search params
    navigate('/browse', { 
      state: { mood },
      search: `?mood=${encodeURIComponent(mood)}`
    });
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Pick A Movie For Me
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the perfect movie based on your mood. Tell us how you're feeling,
            and we'll find movies that match your vibe.
          </p>
        </div>

        {/* Mood Selection */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">
            How are you feeling today?
          </h2>
          <MoodSelector onMoodSelect={handleMoodSelect} />
        </div>

        {/* Featured Movies Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Featured Movies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-[2/3]"></div>
                  <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              featuredMovies.map(movie => (
                <div 
                  key={movie.id} 
                  className="group cursor-pointer"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {movie.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">🎭</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Mood-Based
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Find movies that perfectly match your current mood
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">🎬</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Curated Selection
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover hand-picked movies from various genres
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">🎥</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Watch Instantly
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Find where to stream your chosen movies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
