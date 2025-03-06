# Pick A Movie For Me

A modern movie recommendation app that helps you find the perfect movie based on your mood, with real-time streaming availability and dark mode support.

## Features

- 🎭 Mood-based movie recommendations
- 🎬 Comprehensive movie details and trailers
- 📺 Real-time streaming availability
- 🌍 Regional availability support
- 🎨 Dark/Light mode with system preference detection
- 💰 Price comparison for rentals/purchases
- 🔍 Advanced filtering options
- 📱 Responsive design

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PickAMovieForMe.git
cd PickAMovieForMe
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend (.env)
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
TMDB_READ_ACCESS_TOKEN=your_tmdb_token
FRONTEND_URL=http://localhost:3000

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TMDB_KEY=your_tmdb_api_key
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
PickAMovieForMe/
├── backend/               # Node.js/Express backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── config/       # Configuration
│   └── package.json
│
└── frontend/             # React frontend
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── services/     # API services
    │   └── styles/       # Global styles
    └── package.json
```

## Documentation

- [Project Overview](frontend/OVERVIEW.md)
- [API Documentation](frontend/docs/API.md)
- [Testing Guide](frontend/docs/TESTING.md)
- [Visual Testing](frontend/docs/VISUAL_TESTING.md)
- [Component Documentation](frontend/src/components/README.md)

## Features in Detail

### Mood-Based Recommendations
Select your current mood and get personalized movie recommendations that match your emotional state.

### Streaming Availability
- Real-time availability checking across major platforms
- Regional support for multiple countries
- Price comparison for rentals/purchases
- "Leaving Soon" notifications

### Dark Mode
- System theme preference detection
- Persistent theme selection
- Smooth transitions between themes
- Accessible color schemes

### Advanced Filtering
- Filter by streaming service
- Genre selection
- Release year range
- Rating filters
- Combined mood and genre filters

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

### APIs
- TMDB API
- Streaming Availability API
- YouTube API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their comprehensive movie database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All contributors who have helped shape this project