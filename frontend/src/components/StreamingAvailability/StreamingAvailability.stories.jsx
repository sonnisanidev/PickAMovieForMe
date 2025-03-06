import React from 'react';
import StreamingAvailability from './StreamingAvailability';
import { STREAMING_SERVICE_INFO } from '../../services/api/streamingConfig';

// Mock the streaming service
jest.mock('../../services/api/streamingService', () => ({
  getMovieStreamingInfo: async (imdbId, country) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (country === 'GB') {
      return {
        netflix: {
          type: 'subscription',
          quality: 'HD',
          link: 'https://netflix.com/watch/123',
          leavingDate: '2025-04-01'
        },
        prime: {
          type: 'rental',
          quality: '4K',
          price: 2.99,
          currency: 'GBP',
          link: 'https://amazon.co.uk/rent/123'
        }
      };
    }

    return {
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
      },
      disney: {
        type: 'subscription',
        quality: '4K',
        link: 'https://disneyplus.com/123'
      }
    };
  }
}));

export default {
  title: 'Components/StreamingAvailability',
  component: StreamingAvailability,
  argTypes: {
    imdbId: {
      control: 'text',
      description: 'IMDB ID of the movie'
    },
    country: {
      control: 'select',
      options: ['US', 'GB', 'CA', 'AU'],
      description: 'Country code for availability'
    }
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' }
      ]
    }
  }
};

// Default view with all services
export const Default = {
  args: {
    imdbId: 'tt1234567',
    country: 'US'
  }
};

// UK region view
export const UKRegion = {
  args: {
    imdbId: 'tt1234567',
    country: 'GB'
  }
};

// Loading state
export const Loading = {
  args: {
    imdbId: 'tt1234567',
    country: 'US'
  },
  parameters: {
    mockData: {
      loading: true
    }
  }
};

// Error state
export const Error = {
  args: {
    imdbId: 'invalid',
    country: 'US'
  }
};

// Mobile view
export const Mobile = {
  args: {
    imdbId: 'tt1234567',
    country: 'US'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Dark theme
export const DarkTheme = {
  args: {
    imdbId: 'tt1234567',
    country: 'US'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
};
