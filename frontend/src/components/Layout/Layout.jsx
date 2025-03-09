import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Layout = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    // Load user preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    // Update document class and save preference
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Header */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Pick A Movie For Me
            </Link>
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`${
                  location.pathname === '/' 
                    ? 'text-blue-500 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-blue-500 dark:hover:text-blue-400 transition-colors`}
              >
                Home
              </Link>
              <Link 
                to="/browse" 
                className={`${
                  location.pathname === '/browse' 
                    ? 'text-blue-500 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-blue-500 dark:hover:text-blue-400 transition-colors`}
              >
                Browse
              </Link>
              <Link 
                to="/about" 
                className={`${
                  location.pathname === '/about' 
                    ? 'text-blue-500 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-blue-500 dark:hover:text-blue-400 transition-colors`}
              >
                About
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>&copy; {new Date().getFullYear()} Pick A Movie For Me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
