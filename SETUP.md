# Setup Guide 🚀

## Prerequisites

- Node.js (v16.x or higher)
- npm (v8.x or higher) or yarn (v1.22.x or higher)
- Git

## Environment Setup

### API Keys Required
1. TMDB API
   - Create an account at [TMDB](https://www.themoviedb.org/)
   - Get API key and Read Access Token
   
2. RapidAPI (for Streaming Availability)
   - Sign up at [RapidAPI](https://rapidapi.com/)
   - Subscribe to the Streaming Availability API
   - Get your API key

### Frontend Setup (.env)
```bash
# Copy example env file
cp frontend/.env.example frontend/.env

# Update with your keys
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_TMDB_READ_ACCESS_TOKEN=your_tmdb_token
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
REACT_APP_API_URL=http://localhost:5000
```

### Backend Setup (.env)
```bash
# Copy example env file
cp backend/.env.example backend/.env

# Update with your keys
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
TMDB_READ_ACCESS_TOKEN=your_tmdb_token
FRONTEND_URL=http://localhost:3000
```

## Installation

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Development Workflow

### Branch Structure
- `main`: Production-ready code
- `improvements`: Feature development branch

### Current Version: 0.3.2
- Dark mode implementation
- Streaming service integration
- Enhanced UI/UX

### Next Steps
1. Authentication System
   - User registration/login
   - JWT implementation
   - Social auth integration

2. Personalization Features
   - User preferences
   - Watch history
   - Custom lists

3. Social Features
   - Reviews and ratings
   - Sharing functionality
   - User following system

## Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

## Deployment

### Frontend (Vercel/Netlify)
1. Connect repository
2. Set environment variables
3. Deploy from main branch

### Backend (Railway/Heroku)
1. Set up deployment platform
2. Configure environment variables
3. Deploy API server

## Troubleshooting

### Common Issues
1. API Key Issues
   - Verify keys in .env files
   - Check API rate limits
   - Ensure proper key formatting

2. Build Errors
   - Clear node_modules and reinstall
   - Check Node.js version
   - Verify dependency versions

3. Development Server
   - Check port availability
   - Verify proxy settings
   - Clear browser cache

## Additional Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Node.js Documentation](https://nodejs.org/)

## Support

For issues and feature requests:
1. Check existing GitHub issues
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
