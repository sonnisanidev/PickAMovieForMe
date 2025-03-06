# Changelog

All notable changes to the Pick A Movie For Me project will be documented in this file.

## [0.3.2] - 2025-03-06
### Added
- Dark/Light mode toggle functionality
  - Floating theme toggle button with animations
  - System theme preference detection
  - Theme persistence using localStorage
  - Smooth theme transitions
- New Components
  - ThemeToggle component for theme switching
  - Theme initialization script in index.html

### Changed
- Enhanced UI components with dark mode support
- Improved app layout with proper container and spacing
- Updated app metadata and title
- Optimized theme switching to prevent flash on load

### Technical
- Added dark mode configuration to Tailwind
- Implemented theme context and hooks
- Added smooth transitions for theme changes

## [0.3.1] - 2025-03-06
### Added
- Comprehensive visual regression testing infrastructure
  - Storybook stories for StreamingFilter and StreamingAvailability components
  - Visual regression tests using Jest-image-snapshot and Puppeteer
  - Cross-viewport testing (desktop, tablet, mobile)
  - Dark mode and animation state testing
  - Detailed visual testing documentation

### Changed
- Enhanced StreamingFilter component with visual test coverage
- Enhanced StreamingAvailability component with visual test coverage
- Updated testing documentation with visual regression guidelines

### Technical
- Added visual testing dependencies:
  - @storybook/addon-storyshots
  - @storybook/addon-storyshots-puppeteer
  - jest-image-snapshot
  - puppeteer

## [0.3.0] - 2025-03-06
### Added
- Streaming filters in movie browser
  - Filter by streaming service
  - Region selection
  - Rental/purchase toggle
  - Quick filter presets
- Enhanced movie filtering
  - Combined mood, genre, and streaming filters
  - URL parameter synchronization
  - Pagination support
- Updated Components
  - Enhanced MovieBrowser with streaming filters
  - Added StreamingFilter component
  - Updated MovieList for filtered results
- Documentation
  - Updated component documentation
  - Added streaming filter usage examples
  - Enhanced API documentation

### Changed
- Enhanced movie service with streaming filters
- Improved movie data formatting
- Updated UI layout for filter integration
- Optimized movie fetching with filters

## [0.2.0] - 2025-03-06
### Added
- Streaming availability integration
  - Real-time platform availability checking
  - Support for multiple streaming services (Netflix, Prime, Disney+, etc.)
  - Regional availability for multiple countries
  - Price comparison for rentals/purchases
  - "Leaving Soon" notifications
  - Best viewing option recommendations
- New Components
  - StreamingAvailability component for displaying watch options
- New Services
  - Streaming service API integration
  - Streaming configuration and utilities
  - Caching system for streaming data
- Documentation
  - Updated OVERVIEW.md with streaming features
  - Updated component and service README files
  - Added comprehensive API documentation

### Changed
- Enhanced movie details page with streaming availability
- Improved caching system to include streaming data
- Updated service layer architecture
- Expanded documentation coverage

### Dependencies
- Added axios for API requests

## [0.1.0] - 2025-03-06
### Added
- Initial project setup
- Core UI components
  - MoodSelector
  - MovieCard
  - MovieList
  - GenreFilter
  - MovieDetail
  - TrailerPlayer
  - LoadingSpinner
  - ErrorBoundary
  - Layout
- TMDB API integration
- React Router setup with nested routes
- Tailwind CSS styling
- Documentation
  - README.md
  - OVERVIEW.md
  - Component documentation
  - Service documentation

### Dependencies
- React
- React Router
- Tailwind CSS
- Heroicons
