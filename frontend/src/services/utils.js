// Time formatting
export const formatRuntime = (minutes) => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

// Date formatting
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Rating formatting
export const formatRating = (rating) => {
  if (!rating) return '0.0';
  return Number(rating).toFixed(1);
};

// Validation helpers
export const validators = {
  isValidYear: (year) => {
    const currentYear = new Date().getFullYear();
    return year >= 1888 && year <= currentYear + 5;
  },
  
  isValidRating: (rating) => {
    return rating >= 0 && rating <= 10;
  },
  
  isValidId: (id) => {
    return Boolean(id) && !isNaN(parseInt(id));
  }
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  API_ERROR: 'An error occurred while fetching data. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  INVALID_INPUT: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Scroll helpers
export const scrollHelpers = {
  scrollToTop: () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },
  
  scrollToElement: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
};

// URL helpers
export const urlHelpers = {
  getQueryParams: () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  },
  
  updateQueryParams: (params) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    return searchParams.toString();
  }
};

// Array helpers
export const arrayHelpers = {
  shuffle: (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
  
  chunk: (array, size) => {
    return array.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) {
        chunks[chunkIndex] = [];
      }
      chunks[chunkIndex].push(item);
      return chunks;
    }, []);
  }
};

// Analytics helpers (placeholder for future implementation)
export const analyticsHelpers = {
  trackEvent: (eventName, eventData) => {
    // Placeholder for analytics implementation
    console.log('Track Event:', eventName, eventData);
  },
  
  trackPageView: (pageName) => {
    // Placeholder for analytics implementation
    console.log('Track Page View:', pageName);
  }
};
