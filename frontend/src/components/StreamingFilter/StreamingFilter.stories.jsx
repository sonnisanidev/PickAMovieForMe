import React from 'react';
import StreamingFilter from './StreamingFilter';

export default {
  title: 'Components/StreamingFilter',
  component: StreamingFilter,
  argTypes: {
    selectedServices: {
      control: 'object',
      description: 'Array of selected streaming service IDs'
    },
    selectedCountry: {
      control: 'select',
      options: ['US', 'GB', 'CA', 'AU'],
      description: 'Selected country code'
    },
    includeRentals: {
      control: 'boolean',
      description: 'Include rental options'
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state'
    },
    error: {
      control: 'text',
      description: 'Error message'
    }
  }
};

// Default state
export const Default = {
  args: {
    selectedServices: [],
    selectedCountry: 'US',
    includeRentals: false,
    isLoading: false
  }
};

// With selected services
export const WithSelectedServices = {
  args: {
    selectedServices: ['netflix', 'prime'],
    selectedCountry: 'US',
    includeRentals: false
  }
};

// Loading state
export const Loading = {
  args: {
    selectedServices: [],
    selectedCountry: 'US',
    includeRentals: false,
    isLoading: true
  }
};

// Error state
export const Error = {
  args: {
    selectedServices: [],
    selectedCountry: 'US',
    includeRentals: false,
    error: 'Failed to load streaming services'
  }
};

// With rentals included
export const WithRentals = {
  args: {
    selectedServices: ['netflix', 'prime'],
    selectedCountry: 'US',
    includeRentals: true
  }
};

// Different region
export const DifferentRegion = {
  args: {
    selectedServices: ['netflix', 'prime'],
    selectedCountry: 'GB',
    includeRentals: true
  }
};

// Mobile view
export const Mobile = {
  args: {
    selectedServices: ['netflix'],
    selectedCountry: 'US',
    includeRentals: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
