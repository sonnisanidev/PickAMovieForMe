# Pick A Movie For Me - Project Overview

## Project Description
A React-based movie recommendation web application that helps users discover movies based on their mood and preferences, with integrated streaming availability information and comprehensive filtering options.

## Core Features

### Movie Discovery
- Mood-based recommendations
- Genre filtering
- Search functionality
- Trending movies section
- Streaming service filters
- Regional availability

### Movie Information
- Detailed movie information from TMDB
- Cast and crew details
- Trailers and video content
- Similar movie recommendations
- Streaming availability indicators
- Price comparison for rentals

### Streaming Integration
- Real-time streaming availability
- Multiple streaming platforms support (Netflix, Prime, Disney+, etc.)
- Regional availability checking
- Price comparison for rentals/purchases
- "Leaving Soon" notifications
- Best viewing option recommendations
- Comprehensive filtering system:
  - Filter by streaming service
  - Region/country selection
  - Rental/purchase toggle
  - Quick filter presets
  - Combined mood and genre filters

### User Experience
- Dark/Light mode with system preference detection
- Theme persistence and smooth transitions
- Responsive design
- Loading states and error handling
- Mobile-friendly interface
- Accessibility compliance
- URL parameter synchronization
- Filter state persistence

## Technical Stack

### Frontend
- React for UI components
- Tailwind CSS for styling and dark mode
- React Router for navigation
- Axios for API requests

### APIs
- TMDB API for movie data
- Streaming Availability API for watch options
- YouTube API for trailers

### State Management
- React Context/Hooks for theme and app state
- Local storage for caching and preferences
- URL parameter synchronization

## Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── MovieCard/
│   │   ├── MovieList/
│   │   ├── MoodSelector/
│   │   ├── StreamingFilter/
│   │   ├── StreamingAvailability/
│   │   ├── ThemeToggle/
│   │   └── ...
│   ├── pages/
│   │   ├── Home/
│   │   ├── MovieBrowser/
│   │   ├── MovieDetails/
│   │   └── ...
│   ├── services/
│   │   ├── api/
│   │   │   ├── tmdbService.js
│   │   │   ├── streamingService.js
│   │   │   ├── streamingConfig.js
│   │   │   └── config.js
│   │   ├── movieService.js
│   │   └── utils.js
│   └── App.js
└── package.json
```

## Recent Updates

### Dark Mode Support (March 6, 2025)
- Added dark/light mode toggle functionality
- Implemented system theme preference detection
- Created ThemeToggle component with animations
- Added theme persistence using localStorage
- Enhanced UI components with dark mode support
- Optimized theme switching to prevent flash
- Added smooth theme transitions

### Streaming Filters (March 6, 2025)
- Added comprehensive streaming filters to movie browser
- Implemented streaming service selection
- Added regional availability support
- Integrated rental/purchase options
- Created quick filter presets
- Enhanced MovieCard with streaming indicators
- Updated MovieBrowser with combined filtering
- Added URL parameter synchronization

### Streaming Integration (March 6, 2025)
- Added streaming availability service
- Implemented real-time platform availability checking
- Created StreamingAvailability component
- Added regional support for multiple countries
- Integrated price comparison features
- Implemented "Leaving Soon" notifications
- Added caching for streaming data

### Previous Updates
- Initial project setup
- TMDB API integration
- Basic component structure
- Routing implementation
- Documentation setup

## Upcoming Features
- Watch list functionality
- Price alerts
- User authentication
- Personalized recommendations
- Social sharing
- Advanced filter combinations
- Streaming price history

## Development Guidelines
- Component-based architecture
- Responsive design principles
- Accessibility standards
- Comprehensive documentation
- Code reusability
- Performance optimization
- Filter state management
- Cache optimization

## Environment Variables
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_STREAMING_API_KEY=your_streaming_api_key
```

## Documentation
- README.md: Setup and usage instructions
- OVERVIEW.md: Project overview and architecture
- Component READMEs: Component documentation
- Service READMEs: Service layer documentation
- API Documentation: Integration details

## Contributing
Please follow the project's coding standards and documentation requirements when contributing new features or fixes.
