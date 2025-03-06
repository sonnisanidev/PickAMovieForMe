# Pick A Movie For Me

A mood-based movie recommendation app that helps you discover the perfect movie based on how you're feeling.

## Features

- 🎭 Mood-based movie recommendations
- 🎬 Genre filtering
- 🎥 Movie details with trailers
- 📱 Responsive design
- ♿ Accessibility features

## Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/PickAMovieForMe.git
cd PickAMovieForMe/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_TMDB_KEY=your_tmdb_api_key
```

4. **Start the development server**
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Main application pages
│   ├── services/      # API and utility services
│   └── App.js         # Root component with routing
└── package.json
```

## Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## Components

### Core Components
- `MoodSelector` - Mood selection interface
- `MovieCard` - Individual movie display
- `MovieList` - Grid of movie cards
- `GenreFilter` - Genre filtering
- `MovieDetail` - Detailed movie view
- `TrailerPlayer` - YouTube trailer player
- `LoadingSpinner` - Loading indicator
- `ErrorBoundary` - Error handling
- `Layout` - App layout with navigation

### Pages
- `Home` - Landing page with mood selection
- `MovieBrowser` - Movie browsing interface
- `MovieDetails` - Individual movie page
- `About` - App information
- `NotFound` - 404 error page

## Dependencies

### Production
- `react` - UI framework
- `react-router-dom` - Routing
- `@heroicons/react` - Icons
- `tailwindcss` - Styling

### Development
- `@testing-library/react` - Testing utilities
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixing

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000 |
| REACT_APP_TMDB_KEY | TMDB API Key | - |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for movie data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Create React App](https://create-react-app.dev/) for project setup
