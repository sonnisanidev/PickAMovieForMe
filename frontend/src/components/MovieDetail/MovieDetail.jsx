import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { movieService } from '../../services/api/movieService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieService.getMovieDetails(id)
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!movie) return <ErrorMessage message="Movie not found" />;

  const {
    title,
    overview,
    posterPath,
    backdropPath,
    releaseDate,
    voteAverage,
    genres = [],
    runtime,
    credits = {},
    videos = {}
  } = movie;

  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const rating = voteAverage ? Math.round(voteAverage * 10) / 10 : '';
  const director = credits.crew?.find(person => person.job === 'Director')?.name;
  const trailer = videos.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Backdrop Image */}
      {backdropPath && (
        <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original${backdropPath}`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
            {posterPath ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">No poster available</span>
              </div>
            )}
          </div>
        </div>

        {/* Movie Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {title} {year && <span className="text-gray-500">({year})</span>}
            </h1>
            {rating && (
              <div className="flex items-center text-lg text-gray-600 dark:text-gray-400">
                <svg className="w-6 h-6 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{rating}/10</span>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            {runtime && <span>{Math.floor(runtime / 60)}h {runtime % 60}m</span>}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
            )}
            {director && <span>Director: {director}</span>}
          </div>

          {/* Overview */}
          {overview && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{overview}</p>
            </div>
          )}

          {/* Trailer */}
          {trailer && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Trailer</h2>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Movie Trailer"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Cast */}
          {credits.cast?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {credits.cast.slice(0, 8).map(person => (
                  <div key={person.id} className="text-center">
                    <div className="aspect-square rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-2">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl text-gray-400">👤</span>
                        </div>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{person.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
