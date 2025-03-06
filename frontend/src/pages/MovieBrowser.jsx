import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/api/tmdbService';
import { filterByStreamingServices } from '../services/movieService';
import { STREAMING_COUNTRIES } from '../services/api/streamingConfig';
import { 
  MovieList, 
  MoodSelector, 
  GenreFilter, 
  StreamingFilter,
  LoadingSpinner 
} from '../components';

const MovieBrowser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedMood, setSelectedMood] = useState(searchParams.get('mood') || '');
  const [selectedGenres, setSelectedGenres] = useState(searchParams.getAll('genre') || []);
  const [selectedServices, setSelectedServices] = useState(searchParams.getAll('service') || []);
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || STREAMING_COUNTRIES.US);
  const [includeRentals, setIncludeRentals] = useState(searchParams.get('rentals') !== 'false');
  
  // Page state
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(0);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedMood) params.append('mood', selectedMood);
    selectedGenres.forEach(genre => params.append('genre', genre));
    selectedServices.forEach(service => params.append('service', service));
    params.append('country', selectedCountry);
    params.append('rentals', includeRentals.toString());
    params.append('page', currentPage.toString());
    setSearchParams(params);
  }, [selectedMood, selectedGenres, selectedServices, selectedCountry, includeRentals, currentPage]);

  // Fetch movies when filters change
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let response;
        if (selectedMood) {
          response = await tmdbService.getMoviesByMood(selectedMood, currentPage);
        } else if (selectedGenres.length > 0) {
          response = await tmdbService.getMoviesByGenre(selectedGenres[0], currentPage);
        } else {
          response = await tmdbService.getTrendingMovies('week', currentPage);
        }

        setMovies(response.results);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [selectedMood, selectedGenres, currentPage]);

  // Apply streaming filters
  useEffect(() => {
    const filteredResults = filterByStreamingServices(movies, selectedServices, includeRentals);
    setFilteredMovies(filteredResults);
  }, [movies, selectedServices, includeRentals]);

  // Handle filter changes
  const handleMoodChange = (mood) => {
    setSelectedMood(mood);
    setSelectedGenres([]);
    setCurrentPage(1);
  };

  const handleGenreChange = (genres) => {
    setSelectedGenres(genres);
    setSelectedMood('');
    setCurrentPage(1);
  };

  const handleServiceChange = (services) => {
    setSelectedServices(services);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCurrentPage(1);
  };

  const handleRentalChange = (include) => {
    setIncludeRentals(include);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <MoodSelector
              selectedMood={selectedMood}
              onMoodSelect={handleMoodChange}
            />
            
            <GenreFilter
              selectedGenres={selectedGenres}
              onGenreChange={handleGenreChange}
              disabled={!!selectedMood}
            />

            <StreamingFilter
              selectedServices={selectedServices}
              onServiceChange={handleServiceChange}
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
              includeRentals={includeRentals}
              onRentalChange={handleRentalChange}
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <LoadingSpinner message="Finding the perfect movies for you..." />
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  {selectedMood ? `${selectedMood} Movies` : 'Trending Movies'}
                </h2>
                <span className="text-gray-600">
                  {filteredMovies.length} movies found
                </span>
              </div>

              <MovieList
                movies={filteredMovies}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieBrowser;
