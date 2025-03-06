# Pages Directory

This directory contains the main page components for the Pick A Movie For Me application.

## Page Components

### MovieBrowser (`MovieBrowser.jsx`)
The main movie browsing interface with comprehensive filtering:

#### Features
- Combined filtering system:
  - Mood-based recommendations
  - Genre filtering
  - Streaming service filters
  - Region/country selection
  - Rental/purchase options
- URL parameter synchronization
- Pagination support
- Responsive layout
- Loading and error states

#### Components Used
- `MoodSelector`: Mood selection interface
- `GenreFilter`: Genre filtering
- `StreamingFilter`: Streaming platform filters
- `MovieList`: Movie grid display
- `MovieCard`: Individual movie display with streaming indicators
- `LoadingSpinner`: Loading state indicator

#### State Management
- URL parameters for filter persistence
- Combined filter logic
- Streaming availability cache
- Pagination state

#### Usage Example
```jsx
// Basic usage
<MovieBrowser />

// With initial filters
<MovieBrowser
  defaultMood="happy"
  defaultGenres={['28']}
  defaultServices={['netflix']}
  defaultCountry="us"
/>
```

### Home (`Home.jsx`)
Landing page with mood selection:
- Mood selection interface
- Featured movies
- Quick access to popular categories
- Recent recommendations

### MovieDetails (`MovieDetails.jsx`)
Detailed movie information page:
- Full movie details
- Streaming availability
- Trailer player
- Cast and crew information
- Similar movie recommendations

### About (`About.jsx`)
Information about the application:
- Feature overview
- Usage instructions
- Contact information
- Terms and privacy policy

### NotFound (`NotFound.jsx`)
404 error page:
- User-friendly error message
- Navigation options
- Search functionality

## Routing Structure
- `/` - Home page
- `/browse` - Movie browsing interface
- `/movie/:id` - Individual movie details
- `/about` - App information
- `*` - 404 NotFound page

## Implementation Details
- All pages use responsive Tailwind CSS design
- Consistent styling and UI components
- Loading states and error handling
- Integration with shared components
