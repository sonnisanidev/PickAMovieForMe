# Setup Guide for Pick A Movie For Me

## Prerequisites
- Node.js (v18 or later)
- npm (comes with Node.js)
- Git
- A code editor (VS Code recommended)
- TMDB API key (get it from [themoviedb.org](https://www.themoviedb.org/documentation/api))
- Streaming API key (get it from your streaming service provider)

## Frontend Setup (React + Tailwind)

1. **Create React Project**
```bash
npx create-react-app movie-picker-frontend
cd movie-picker-frontend
```

2. **Install Frontend Dependencies**
```bash
npm install @heroicons/react
npm install @headlessui/react
npm install axios
npm install react-router-dom
npm install tailwindcss postcss autoprefixer
```

3. **Initialize Tailwind CSS**
```bash
npx tailwindcss init -p
```

4. **Create Environment Variables**
Create a `.env` file in the frontend root:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_STREAMING_API_KEY=your_streaming_api_key
```

## Backend Setup (Node.js + Express)

1. **Create Backend Project**
```bash
mkdir movie-picker-backend
cd movie-picker-backend
npm init -y
```

2. **Install Backend Dependencies**
```bash
npm install express
npm install cors
npm install dotenv
npm install axios
npm install nodemon --save-dev
```

3. **Create Environment Variables**
Create a `.env` file in the backend root:
```
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
STREAMING_API_KEY=your_streaming_api_key
FRONTEND_URL=http://localhost:3000
```

## Project Structure

```
movie-picker/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── .env
│   └── package.json
└── backend/
    ├── routes/
    ├── controllers/
    ├── .env
    └── package.json
```

## Running the Application

1. **Start Backend**
```bash
cd backend
npm run dev
```

2. **Start Frontend**
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Deployment Instructions

### Frontend Deployment

#### Option 1: Netlify
1. **Prepare Your Repository**
   ```bash
   # In your frontend directory
   npm run build
   ```

2. **Deploy via Netlify UI**
   - Sign up/Login to [Netlify](https://www.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"

3. **Configure Environment Variables**
   - Go to Site settings > Build & deploy > Environment
   - Add your environment variables:
     - `REACT_APP_API_URL`
     - `REACT_APP_TMDB_KEY`
     - `REACT_APP_STREAMING_API_KEY`

4. **Setup Redirects**
   Create a `_redirects` file in the `public` folder:
   ```
   /*    /index.html   200
   ```

#### Option 2: Vercel
1. **Deploy via Vercel UI**
   - Sign up/Login to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework Preset: Create React App
   - Click "Deploy"

2. **Configure Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add your environment variables

### Backend Deployment

#### Option 1: Railway
1. **Prepare Your Code**
   - Ensure your `package.json` has a start script:
     ```json
     "scripts": {
       "start": "node index.js"
     }
     ```

2. **Deploy via Railway UI**
   - Sign up/Login to [Railway](https://railway.app)
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Add environment variables in Settings

3. **Configure Domain**
   - Go to Settings > Domains
   - Copy your Railway domain URL
   - Update frontend's `REACT_APP_API_URL` to this URL

#### Option 2: Render
1. **Prepare for Render**
   - Add a `render.yaml` in your root:
     ```yaml
     services:
       - type: web
         name: movie-picker-api
         env: node
         buildCommand: npm install
         startCommand: npm start
     ```

2. **Deploy via Render UI**
   - Sign up/Login to [Render](https://render.com)
   - Click "New Web Service"
   - Connect your GitHub repository
   - Configure environment variables
   - Click "Create Web Service"

#### Option 3: Heroku
1. **Prepare for Heroku**
   ```bash
   # Install Heroku CLI
   npm install -g heroku
   
   # Login to Heroku
   heroku login
   
   # Create Heroku app
   heroku create movie-picker-api
   
   # Add environment variables
   heroku config:set TMDB_API_KEY=your_key
   heroku config:set STREAMING_API_KEY=your_key
   ```

2. **Deploy**
   ```bash
   git push heroku main
   ```

### Important Deployment Notes

1. **CORS Configuration**
   - Update your backend CORS settings with the new frontend URL
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL
   }));
   ```

2. **Environment Variables**
   - Never commit `.env` files
   - Set all environment variables in your deployment platform
   - Update frontend API URL after backend deployment

3. **SSL/HTTPS**
   - Ensure both frontend and backend use HTTPS in production
   - Most deployment platforms handle this automatically

4. **Monitoring**
   - Set up basic monitoring (all platforms provide this)
   - Configure alerts for downtime
   - Monitor API rate limits (TMDB API and Streaming API)

5. **Database (if added later)**
   - Use managed database services
   - Configure database connection strings as environment variables
   - Set up database backups

## Important Notes
- Never commit `.env` files to Git
- Add `.env` to your `.gitignore` file
- Keep your TMDB API key and Streaming API key secure
- Use environment variables for all sensitive information
- Always run `npm install` after pulling new changes

## Streaming Filters Integration

### Available Streaming Services
- Netflix
- Amazon Prime
- Disney+
- HBO Max
- Hulu
- Apple TV+
- Paramount+
- Peacock
- More based on region

### Streaming Filter Features
1. **Service Selection**
   - Multiple service selection
   - Quick presets (All, None, Subscriptions Only)
   - Service-specific filters

2. **Regional Support**
   - Country/region selection
   - Region-specific service availability
   - Price in local currency
   - Content differences by region

3. **Content Types**
   - Subscription streaming
   - Rental options
   - Purchase options
   - Free with ads
   - Leaving soon alerts

4. **Filter Combinations**
   - Combine with mood filters
   - Combine with genre filters
   - Save filter preferences
   - URL parameter sync

### Filter Implementation

#### URL Parameters
The application supports the following URL parameters for filters:

```
/browse?mood=happy&service=netflix,prime&country=us&rentals=true
```

- `mood`: Current mood selection
- `service`: Comma-separated list of services
- `country`: Country code (ISO 3166-1)
- `rentals`: Include rental options (true/false)
- `page`: Current page number
- `genre`: Comma-separated genre IDs

#### Filter State Management
1. **URL Synchronization**
   - Filter state in URL
   - Shareable filtered views
   - Browser history support
   - Deep linking

2. **Local Storage**
   - User preferences
   - Recent filters
   - Country selection
   - Service preferences

3. **Cache Management**
   - Streaming data cache
   - Cache invalidation
   - Regional data updates
   - Price updates

## Development Guidelines

### Code Organization
```
frontend/src/
├── components/
│   ├── StreamingFilter/
│   │   ├── index.jsx
│   │   ├── ServiceSelector.jsx
│   │   ├── RegionSelector.jsx
│   │   └── FilterPresets.jsx
│   └── StreamingAvailability/
│       ├── index.jsx
│       ├── ServiceBadge.jsx
│       └── PriceDisplay.jsx
└── services/
    └── api/
        ├── streamingService.js
        └── streamingConfig.js
```

### Component Guidelines
1. **StreamingFilter**
   - Keep filter logic separate
   - Use debounced updates
   - Maintain accessibility
   - Support keyboard navigation

2. **StreamingAvailability**
   - Efficient data updates
   - Clear price display
   - Service badge consistency
   - Loading states

### Performance Optimization
1. **Data Fetching**
   - Implement caching
   - Batch API requests
   - Regional data preloading
   - Error retry logic

2. **State Updates**
   - Debounced filter changes
   - Optimized re-renders
   - Memoized calculations
   - Efficient list updates

### Testing Guidelines
1. **Unit Tests**
   - Filter logic
   - Price calculations
   - Service availability
   - Regional differences

2. **Integration Tests**
   - Filter combinations
   - API integration
   - Cache management
   - URL synchronization

3. **E2E Tests**
   - User flows
   - Filter interactions
   - Regional switching
   - Error handling

## Troubleshooting

### Common Issues
1. **API Rate Limits**
   - Implement request queuing
   - Cache responses
   - Show user feedback
   - Retry with backoff

2. **Regional Data**
   - Handle missing data
   - Default to US/GB
   - Clear error messages
   - Fallback options

3. **Filter State**
   - Clear reset options
   - State persistence
   - History management
   - Error recovery

## Maintenance

### Regular Tasks
1. **API Updates**
   - Monitor rate limits
   - Update service lists
   - Check regional changes
   - Validate pricing

2. **Cache Management**
   - Clear old data
   - Update intervals
   - Size monitoring
   - Performance checks

3. **Documentation**
   - Update API changes
   - New features
   - Bug fixes
   - User guides
