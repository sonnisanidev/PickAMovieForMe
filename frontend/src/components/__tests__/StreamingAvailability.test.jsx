import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StreamingAvailability from '../StreamingAvailability';
import { getMovieStreamingInfo } from '../../services/api/streamingService';

// Mock the streaming service
jest.mock('../../services/api/streamingService');

describe('StreamingAvailability Component', () => {
  const mockStreamingInfo = {
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

  beforeEach(() => {
    jest.clearAllMocks();
    getMovieStreamingInfo.mockResolvedValue(mockStreamingInfo);
  });

  it('fetches and displays streaming availability', async () => {
    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    // Check loading state
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Verify streaming services are displayed
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Prime Video')).toBeInTheDocument();
    expect(screen.getByText('Disney+')).toBeInTheDocument();
  });

  it('shows subscription vs rental badges', async () => {
    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    await waitFor(() => {
      const netflixBadge = screen.getByTestId('netflix-badge');
      const primeBadge = screen.getByTestId('prime-badge');

      expect(netflixBadge).toHaveTextContent('Included');
      expect(primeBadge).toHaveTextContent('$3.99');
    });
  });

  it('displays leaving soon warning', async () => {
    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/leaving netflix on april 1, 2025/i))
        .toBeInTheDocument();
    });
  });

  it('handles region changes', async () => {
    const gbStreamingInfo = {
      ...mockStreamingInfo,
      prime: {
        ...mockStreamingInfo.prime,
        price: 2.99,
        currency: 'GBP'
      }
    };

    getMovieStreamingInfo
      .mockResolvedValueOnce(mockStreamingInfo)
      .mockResolvedValueOnce(gbStreamingInfo);

    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    // Wait for US data
    await waitFor(() => {
      expect(screen.getByText('$3.99')).toBeInTheDocument();
    });

    // Change region to GB
    act(() => {
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        'GB'
      );
    });

    // Wait for GB data
    await waitFor(() => {
      expect(screen.getByText('£2.99')).toBeInTheDocument();
    });
  });

  it('handles errors gracefully', async () => {
    getMovieStreamingInfo.mockRejectedValue(
      new Error('Failed to fetch streaming data')
    );

    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch streaming data/i))
        .toBeInTheDocument();
    });
  });

  it('sorts streaming options by price and type', async () => {
    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    await waitFor(() => {
      const services = screen.getAllByTestId(/.*-badge/);
      
      // Subscription services should come first
      expect(services[0]).toHaveTextContent('Netflix');
      expect(services[1]).toHaveTextContent('Disney+');
      
      // Rentals should come last
      expect(services[2]).toHaveTextContent('Prime Video');
    });
  });

  it('shows best viewing option', async () => {
    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('best-option'))
        .toHaveTextContent(/best: included with netflix/i);
    });
  });

  it('handles unavailable streaming options', async () => {
    getMovieStreamingInfo.mockResolvedValue({});

    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/not available for streaming/i))
        .toBeInTheDocument();
    });
  });

  it('updates when imdbId changes', async () => {
    const { rerender } = render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Netflix')).toBeInTheDocument();
    });

    const newStreamingInfo = {
      hulu: {
        type: 'subscription',
        quality: 'HD',
        link: 'https://hulu.com/watch/456'
      }
    };

    getMovieStreamingInfo.mockResolvedValue(newStreamingInfo);

    rerender(
      <StreamingAvailability
        imdbId="tt7654321"
        country="US"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Hulu')).toBeInTheDocument();
      expect(screen.queryByText('Netflix')).not.toBeInTheDocument();
    });
  });

  it('maintains cache between region switches', async () => {
    render(
      <StreamingAvailability
        imdbId="tt1234567"
        country="US"
      />
    );

    await waitFor(() => {
      expect(getMovieStreamingInfo).toHaveBeenCalledTimes(1);
    });

    // Switch region
    act(() => {
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        'GB'
      );
    });

    await waitFor(() => {
      expect(getMovieStreamingInfo).toHaveBeenCalledTimes(2);
    });

    // Switch back to US
    act(() => {
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        'US'
      );
    });

    // Should use cached US data
    expect(getMovieStreamingInfo).toHaveBeenCalledTimes(2);
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', async () => {
      render(
        <StreamingAvailability
          imdbId="tt1234567"
          country="US"
        />
      );

      await waitFor(() => {
        expect(screen.getByLabelText(/streaming options/i))
          .toBeInTheDocument();
        expect(screen.getByLabelText(/select region/i))
          .toBeInTheDocument();
      });
    });

    it('has proper focus management', async () => {
      render(
        <StreamingAvailability
          imdbId="tt1234567"
          country="US"
        />
      );

      await waitFor(() => {
        const links = screen.getAllByRole('link');
        links.forEach(link => {
          link.focus();
          expect(document.activeElement).toBe(link);
        });
      });
    });
  });
});
