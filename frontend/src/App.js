import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieBrowser from './components/MovieBrowser/MovieBrowser';
import MovieDetail from './components/MovieDetail/MovieDetail';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './styles/tailwind.css';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<MovieBrowser />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
          </div>
          <ThemeToggle />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
