# Changelog

All notable changes to Pick A Movie For Me will be documented in this file.


## [0.5.0] - 2024-01-20

### Added

- Restored sorting functionality in movie recommendations
- Added support for multiple sorting options (popularity, rating, release date)
- Added minimum vote count threshold for rating-based sorting

### Changed

- Updated movieService to handle sorting parameters
- Enhanced backend API with sorting validation and processing
- Improved error handling for invalid sort parameters

### Fixed

- Fixed markdown linting issues in documentation
- Fixed genre filtering with sort combinations


## [0.4.0] - 2024-01-19

### Added

- Restored GenreFilter component with multi-select support
- Added React Query integration for genre data fetching
- Added SortingFilter component for movie sorting options

### Changed

- Updated MovieBrowser to integrate restored components
- Enhanced API service with caching for better performance
- Improved error handling in API requests

### Fixed

- Fixed component integration issues
- Fixed state management in filters


## [0.3.5] - 2025-03-09

### Added

- Dark mode toggle in navigation bar with system preference detection
- Sticky navigation with blur effect
- Browse link in main navigation
- Improved animations and transitions
- Beautiful gradient backgrounds across all pages

### Changed

- Updated About page with dark mode support and modern design
- Enhanced NotFound page with animations and consistent styling
- Improved Layout component with better structure and responsiveness
- Updated package.json with compatible React 18 dependencies
- Consolidated styles with shared Tailwind classes

### Fixed

- Dark mode persistence across page reloads
- TMDB logo visibility in dark mode
- Navigation active state indicators
- Footer positioning and styling


## [0.3.4] - 2025-03-09

### Added

- Enhanced home page with featured movies section
- Added trending movies display on landing page
- Implemented loading states with skeleton UI
- Added dark mode support for home page

### Changed

- Improved navigation flow from home to movie browser
- Enhanced mood selection UI with better visual feedback
- Updated layout component for proper routing control
- Improved home page responsiveness and animations


## [0.3.3] - 2025-03-09

### Changed

- Replaced "Load More Movies" with pagination controls
- Set fixed number of movies per page to 20
- Added Previous/Next navigation buttons
- Added page counter and smooth scroll on page change
- Updated API to consistently return 20 movies per request


## [0.3.2] - 2025-03-06

### Added

- Dark/Light mode toggle with system preference detection
- Theme persistence using localStorage
- Back button in movie details page
- Enhanced dark mode support throughout the application

### Changed

- Updated UI components for dark mode compatibility
- Improved movie details page layout and spacing
- Enhanced documentation structure and organization

### Fixed

- Movie details page navigation
- Theme-aware image loading
- Environment variable handling and security


## [0.3.1] - 2025-03-05

### Added

- Streaming availability integration
- Regional support for streaming services
- Price comparison features
- Quick filter presets

### Changed

- Enhanced MovieCard component with streaming indicators
- Updated MovieBrowser with combined filtering system
- Improved cache management for streaming data


## [0.3.0] - 2025-03-04

### Added

- Initial streaming service integration
- Service selection interface
- Region selection support
- Rental/purchase options display


## Planned Features

### High Priority in 0.3.x

1. User Authentication
   - JWT-based authentication
   - User profiles and preferences
   - Social login options

2. Personalization
   - Watch history tracking
   - Personalized recommendations
   - Custom movie lists

3. Social Features
   - Movie ratings and reviews
   - Share recommendations
   - Follow other users


### Medium Priority in 0.3.x

1. Enhanced Search
   - Advanced filtering options
   - Voice search support
   - Search history

2. Content Improvements
   - More detailed movie information
   - Cast and crew details
   - Similar movie recommendations

3. UI/UX Enhancements
   - Animations and transitions
   - Accessibility improvements
   - Mobile responsiveness optimization


### Low Priority in 0.3.x

1. Additional Features
   - Movie watchlist
   - Notification system
   - Export functionality

2. Integration Extensions
   - Additional streaming services
   - Movie news and updates
   - External review aggregation

3. Performance Optimizations
   - Image lazy loading
   - Server-side rendering
   - API response caching
