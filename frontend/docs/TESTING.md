# Testing Guide

## Streaming Integration Tests

### 1. Unit Tests

#### StreamingService Tests
```javascript
// streamingService.test.js
import { getMovieStreamingInfo, searchByStreamingService } from '../services/api/streamingService';
import { mockStreamingData, mockSearchResults } from '../mocks/streamingData';

describe('StreamingService', () => {
  describe('getMovieStreamingInfo', () => {
    it('should fetch streaming info for a movie', async () => {
      const imdbId = 'tt1234567';
      const result = await getMovieStreamingInfo(imdbId);
      
      expect(result).toHaveProperty('netflix');
      expect(result.netflix).toHaveProperty('type');
      expect(result.netflix).toHaveProperty('link');
    });

    it('should handle region-specific data', async () => {
      const imdbId = 'tt1234567';
      const usResult = await getMovieStreamingInfo(imdbId, 'US');
      const ukResult = await getMovieStreamingInfo(imdbId, 'GB');
      
      expect(usResult.netflix?.price).toBeDefined();
      expect(usResult.netflix?.currency).toBe('USD');
      expect(ukResult.netflix?.currency).toBe('GBP');
    });

    it('should throw error for invalid region', async () => {
      const imdbId = 'tt1234567';
      await expect(
        getMovieStreamingInfo(imdbId, 'XX')
      ).rejects.toThrow('Region not supported');
    });
  });

  describe('searchByStreamingService', () => {
    it('should search movies by streaming service', async () => {
      const options = {
        services: ['netflix', 'prime'],
        country: 'US'
      };
      
      const result = await searchByStreamingService(options);
      expect(result.results).toBeInstanceOf(Array);
      expect(result.totalResults).toBeGreaterThan(0);
    });

    it('should filter by subscription type', async () => {
      const options = {
        services: ['netflix'],
        includeRentals: false
      };
      
      const result = await searchByStreamingService(options);
      const hasOnlySubscriptions = result.results.every(
        movie => movie.streamingInfo.netflix?.type === 'subscription'
      );
      
      expect(hasOnlySubscriptions).toBe(true);
    });
  });
});
```

#### StreamingFilter Component Tests
```javascript
// StreamingFilter.test.jsx
import { render, fireEvent, screen } from '@testing-library/react';
import StreamingFilter from '../components/StreamingFilter';

describe('StreamingFilter', () => {
  const mockOnServiceChange = jest.fn();
  const mockOnCountryChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all streaming services', () => {
    render(
      <StreamingFilter
        selectedServices={[]}
        onServiceChange={mockOnServiceChange}
        selectedCountry="US"
        onCountryChange={mockOnCountryChange}
      />
    );

    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Prime Video')).toBeInTheDocument();
    expect(screen.getByText('Disney+')).toBeInTheDocument();
  });

  it('should handle service selection', () => {
    render(
      <StreamingFilter
        selectedServices={[]}
        onServiceChange={mockOnServiceChange}
        selectedCountry="US"
        onCountryChange={mockOnCountryChange}
      />
    );

    fireEvent.click(screen.getByText('Netflix'));
    expect(mockOnServiceChange).toHaveBeenCalledWith(['netflix']);
  });

  it('should handle country change', () => {
    render(
      <StreamingFilter
        selectedServices={[]}
        onServiceChange={mockOnServiceChange}
        selectedCountry="US"
        onCountryChange={mockOnCountryChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Region'), {
      target: { value: 'GB' }
    });
    expect(mockOnCountryChange).toHaveBeenCalledWith('GB');
  });

  it('should handle quick presets', () => {
    render(
      <StreamingFilter
        selectedServices={[]}
        onServiceChange={mockOnServiceChange}
        selectedCountry="US"
        onCountryChange={mockOnCountryChange}
      />
    );

    fireEvent.click(screen.getByText('Subscriptions Only'));
    expect(mockOnServiceChange).toHaveBeenCalledWith([
      'netflix',
      'prime',
      'disney'
    ]);
  });
});
```

### 2. Integration Tests

#### Streaming Filter Integration
```javascript
// streamingIntegration.test.js
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MovieBrowser from '../pages/MovieBrowser';

describe('Streaming Filter Integration', () => {
  it('should update movie list when filters change', async () => {
    render(<MovieBrowser />);

    // Select streaming service
    fireEvent.click(screen.getByText('Netflix'));
    
    await waitFor(() => {
      const movies = screen.getAllByTestId('movie-card');
      const hasNetflixBadge = movies.every(
        movie => movie.querySelector('[data-testid="netflix-badge"]')
      );
      expect(hasNetflixBadge).toBe(true);
    });
  });

  it('should combine mood and streaming filters', async () => {
    render(<MovieBrowser />);

    // Select mood and streaming service
    fireEvent.click(screen.getByText('Happy'));
    fireEvent.click(screen.getByText('Netflix'));

    await waitFor(() => {
      const movies = screen.getAllByTestId('movie-card');
      expect(movies.length).toBeGreaterThan(0);
      expect(screen.getByTestId('active-filters'))
        .toHaveTextContent('Happy • Netflix');
    });
  });

  it('should persist filter state in URL', async () => {
    render(<MovieBrowser />);

    fireEvent.click(screen.getByText('Netflix'));
    fireEvent.click(screen.getByText('Prime Video'));

    await waitFor(() => {
      expect(window.location.search)
        .toContain('service=netflix,prime');
    });
  });
});
```

## Theme Integration Tests

### 1. Unit Tests

#### ThemeToggle Tests
```javascript
// ThemeToggle.test.jsx
import { render, fireEvent, screen } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage and document class
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should render theme toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should toggle theme on click', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Toggle to dark mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Toggle back to light mode
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should respect system preference', () => {
    // Mock system dark mode preference
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }));

    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should persist theme preference', () => {
    // Set initial theme preference
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
```

### 2. Integration Tests

#### Theme Integration
```javascript
// themeIntegration.test.js
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from '../App';

describe('Theme Integration', () => {
  it('should apply theme to all components', async () => {
    render(<App />);
    const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });

    // Toggle to dark mode
    fireEvent.click(themeToggle);
    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      // Check if components have dark mode styles
      expect(screen.getByTestId('movie-browser')).toHaveClass('dark:bg-gray-900');
      expect(screen.getByTestId('streaming-filter')).toHaveClass('dark:bg-gray-800');
    });
  });

  it('should maintain theme across navigation', async () => {
    render(<App />);
    
    // Set dark mode
    fireEvent.click(screen.getByRole('button', { name: /toggle dark mode/i }));
    
    // Navigate to movie details
    fireEvent.click(screen.getAllByTestId('movie-card')[0]);
    
    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(screen.getByTestId('movie-detail')).toHaveClass('dark:bg-gray-900');
    });
  });

  it('should handle theme transition animations', async () => {
    render(<App />);
    const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });

    fireEvent.click(themeToggle);
    await waitFor(() => {
      const elements = screen.getAllByTestId(/.*-transition/);
      elements.forEach(element => {
        expect(element).toHaveClass('transition-colors', 'duration-200');
      });
    });
  });
});
```

### 3. End-to-End Tests

```javascript
// streaming.spec.js (Cypress)
describe('Streaming Features', () => {
  beforeEach(() => {
    cy.visit('/browse');
  });

  it('should filter movies by streaming service', () => {
    // Select Netflix
    cy.get('[data-testid="service-netflix"]').click();

    // Verify movies are from Netflix
    cy.get('[data-testid="movie-card"]').each($card => {
      cy.wrap($card).find('[data-testid="netflix-badge"]')
        .should('exist');
    });
  });

  it('should handle region switching', () => {
    // Change region to UK
    cy.get('[data-testid="region-selector"]')
      .select('GB');

    // Verify prices in GBP
    cy.get('[data-testid="price-tag"]').each($price => {
      cy.wrap($price).should('contain', '£');
    });
  });

  it('should combine filters correctly', () => {
    // Select mood
    cy.get('[data-testid="mood-happy"]').click();

    // Select streaming services
    cy.get('[data-testid="service-netflix"]').click();
    cy.get('[data-testid="service-prime"]').click();

    // Select genre
    cy.get('[data-testid="genre-comedy"]').click();

    // Verify filter combination
    cy.get('[data-testid="active-filters"]')
      .should('contain', 'Happy')
      .and('contain', 'Netflix')
      .and('contain', 'Prime')
      .and('contain', 'Comedy');

    // Verify movie results
    cy.get('[data-testid="movie-card"]')
      .should('have.length.at.least', 1);
  });

  it('should handle rental options', () => {
    // Enable rental options
    cy.get('[data-testid="include-rentals"]').click();

    // Verify rental prices are shown
    cy.get('[data-testid="rental-price"]')
      .should('exist');
  });
});
```

### 4. Performance Tests

```javascript
// streaming.perf.test.js
import { performance } from 'perf_hooks';
import { getMovieStreamingInfo, searchByStreamingService } from '../services/api/streamingService';

describe('Streaming Performance', () => {
  it('should cache streaming data effectively', async () => {
    const imdbId = 'tt1234567';
    
    // First call - no cache
    const start1 = performance.now();
    await getMovieStreamingInfo(imdbId);
    const duration1 = performance.now() - start1;

    // Second call - should use cache
    const start2 = performance.now();
    await getMovieStreamingInfo(imdbId);
    const duration2 = performance.now() - start2;

    expect(duration2).toBeLessThan(duration1 * 0.1);
  });

  it('should handle multiple service filters efficiently', async () => {
    const start = performance.now();
    
    await searchByStreamingService({
      services: ['netflix', 'prime', 'disney'],
      country: 'US',
      page: 1,
      limit: 20
    });

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(1000); // 1 second threshold
  });
});
```

### 5. Error Handling Tests

```javascript
// streamingErrors.test.js
import { getMovieStreamingInfo } from '../services/api/streamingService';
import { StreamingApiError } from '../services/api/errors';

describe('Streaming Error Handling', () => {
  it('should handle rate limiting', async () => {
    // Mock rate limit response
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.reject(new StreamingApiError(
        'Rate limit exceeded',
        'rate_limit_exceeded',
        60
      ))
    );

    try {
      await getMovieStreamingInfo('tt1234567');
    } catch (error) {
      expect(error).toBeInstanceOf(StreamingApiError);
      expect(error.code).toBe('rate_limit_exceeded');
      expect(error.retryAfter).toBe(60);
    }
  });

  it('should handle region errors', async () => {
    try {
      await getMovieStreamingInfo('tt1234567', 'XX');
    } catch (error) {
      expect(error).toBeInstanceOf(StreamingApiError);
      expect(error.code).toBe('region_not_supported');
    }
  });
});
```

## Test Coverage Requirements

### Minimum Coverage Thresholds
```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85
    },
    './src/services/api/streamingService.js': {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90
    }
  }
};
```

## Running Tests

### Unit and Integration Tests
```bash
# Run all tests
npm test

# Run streaming-related tests
npm test streaming

# Run with coverage
npm test -- --coverage
```

### E2E Tests
```bash
# Run Cypress tests
npm run cypress:open

# Run Cypress tests headless
npm run cypress:run
```

### Performance Tests
```bash
# Run performance tests
npm run test:perf
```

## Test Data

### Mock Data Setup
```javascript
// mocks/streamingData.js
export const mockStreamingData = {
  netflix: {
    type: 'subscription',
    quality: 'HD',
    link: 'https://netflix.com/watch/123',
    leavingDate: '2025-04-01'
  },
  prime: {
    type: 'rental',
    quality: '4K',
    price: 3.99,
    currency: 'USD',
    link: 'https://amazon.com/rent/123'
  }
};

export const mockSearchResults = {
  results: [
    {
      imdbId: 'tt1234567',
      title: 'Test Movie',
      streamingInfo: mockStreamingData
    }
  ],
  page: 1,
  totalPages: 10,
  totalResults: 100
};
```

## Best Practices

### Testing Guidelines
1. **Coverage**
   - Maintain high test coverage for streaming features
   - Focus on critical user paths
   - Test edge cases and error scenarios

2. **Mocking**
   - Mock API responses
   - Simulate rate limiting
   - Test different regions
   - Cache behavior testing

3. **Performance**
   - Test caching effectiveness
   - Monitor API call frequency
   - Verify render performance
   - Check memory usage

4. **Integration**
   - Test filter combinations
   - Verify state management
   - Check URL synchronization
   - Test component interactions
