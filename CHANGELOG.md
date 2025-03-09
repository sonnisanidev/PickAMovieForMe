# Changelog

All notable changes to Pick A Movie For Me will be documented in this file.

## [0.3.3] - 2025-03-09

### Changed in 0.3.3

- Replaced "Load More Movies" with pagination controls
- Set fixed number of movies per page to 20
- Added Previous/Next navigation buttons
- Added page counter and smooth scroll on page change
- Updated API to consistently return 20 movies per request

## [0.3.2] - 2025-03-06

### Added in 0.3.2

- Dark/Light mode toggle with system preference detection
- Theme persistence using localStorage
- Back button in movie details page
- Enhanced dark mode support throughout the application

### Changed in 0.3.2

- Updated UI components for dark mode compatibility
- Improved movie details page layout and spacing
- Enhanced documentation structure and organization

### Fixed in 0.3.2

- Movie details page navigation
- Theme-aware image loading
- Environment variable handling and security

## [0.3.1] - 2025-03-05

### Added in 0.3.1

- Streaming availability integration
- Regional support for streaming services
- Price comparison features
- Quick filter presets

### Changed in 0.3.1

- Enhanced MovieCard component with streaming indicators
- Updated MovieBrowser with combined filtering system
- Improved cache management for streaming data

## [0.3.0] - 2025-03-04

### Added in 0.3.0

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
