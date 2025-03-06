# Components Directory

This directory contains reusable UI components for the Pick A Movie For Me application.

## Core Components

### ThemeToggle.jsx
- Dark/Light mode toggle with animated icons
- System theme preference detection
- Theme persistence using localStorage
- Smooth theme transitions
- Floating button design
- Props:
  - `className`: Optional class name for additional styling
  - `position`: Optional position override, default is 'bottom-right'
  - `onThemeChange`: Optional callback when theme changes
- Features:
  - Automatic system theme detection
  - Smooth icon transitions
  - Accessible button design
  - Hover and focus states
  - Shadow effects
  - Automatic system theme detection
  - Smooth transition animations
  - Theme persistence in localStorage
  - Accessible button with ARIA labels
  - Keyboard navigation support
  - Mobile-friendly touch targets

### MoodSelector.jsx
- Mood selection interface with emojis
- Maps moods to relevant movie genres
- Responsive grid layout
- Hover and selection animations

### MovieCard.jsx
- Individual movie display component
- Shows poster, title, rating, and actions
- Handles missing images gracefully
- Responsive design for different screen sizes

### MovieList.jsx
- Grid layout for movie cards
- Responsive grid with breakpoints
- Loading state handling
- Empty state messaging

### MovieDetail.jsx
- Comprehensive movie information display
- Backdrop image with gradient overlay
- Rating, runtime, and release date
- Genre tags and overview
- Trailer modal integration
- IMDb linking

### GenreFilter.jsx
- Genre selection interface
- Multi-select functionality
- Toggle button design
- Responsive layout

### TrailerPlayer.jsx
- YouTube video integration
- Responsive iframe container
- Error state handling
- Close button functionality

### LoadingSpinner.jsx
- Customizable spinner sizes
- Optional loading message
- Tailwind CSS animations
- Consistent styling

### ErrorBoundary.jsx
- React error boundary implementation
- Fallback UI for errors
- Development mode error details
- Recovery actions

### Layout.jsx
- App-wide layout component
- Responsive navigation bar
- Mobile menu functionality
- Consistent footer

### StreamingAvailability.jsx
A component that displays streaming availability information for movies:
- Shows where to watch movies across different streaming platforms
- Displays pricing information when available
- Indicates when content is leaving a platform
- Allows country/region selection
- Shows best viewing option
- Props:
  - `imdbId`: Movie's IMDB ID
  - `country`: Optional country code (defaults to US)

### StreamingFilter
A component that allows users to filter movies by streaming availability:
- Filter by multiple streaming services
- Region/country selection
- Toggle rental/purchase options
- Quick filter presets (All, None, Subscriptions Only)
- Props:
  - `selectedServices`: Array of selected service IDs
  - `onServiceChange`: (services: string[]) => void
  - `selectedCountry`: Selected country code
  - `onCountryChange`: (country: string) => void
  - `includeRentals`: Boolean to include rental options
  - `onRentalChange`: (include: boolean) => void

### MovieBrowser
Main page component for browsing movies:
- Combines mood, genre, and streaming filters
- Responsive grid layout
- URL parameter synchronization
- Pagination support
- Filter state management
- Loading and error states

## Implementation Details
- All components use Tailwind CSS
- Responsive design principles
- Accessibility features
- Error handling
- Loading states
- TypeScript prop validation (planned)

## Component Exports
Components are exported through `index.js` for clean imports:
```javascript
export { ThemeToggle } from './ThemeToggle';
export { MoodSelector } from './MoodSelector';
export { MovieCard } from './MovieCard';
export { MovieList } from './MovieList';
export { GenreFilter } from './GenreFilter';
export { MovieDetail } from './MovieDetail';
export { TrailerPlayer } from './TrailerPlayer';
export { LoadingSpinner } from './LoadingSpinner';
export { ErrorBoundary } from './ErrorBoundary';
export { Layout } from './Layout';
export { StreamingAvailability } from './StreamingAvailability';
export { StreamingFilter } from './StreamingFilter';
export { MovieBrowser } from './MovieBrowser';
