import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StreamingFilter from '../StreamingFilter';
import { STREAMING_SERVICE_INFO } from '../../services/api/streamingConfig';

describe('StreamingFilter Component', () => {
  const defaultProps = {
    selectedServices: [],
    onServiceChange: jest.fn(),
    selectedCountry: 'US',
    onCountryChange: jest.fn(),
    includeRentals: false,
    onRentalChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all streaming services', () => {
    render(<StreamingFilter {...defaultProps} />);

    Object.entries(STREAMING_SERVICE_INFO).forEach(([_, service]) => {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    });
  });

  it('shows selected services as active', () => {
    render(
      <StreamingFilter
        {...defaultProps}
        selectedServices={['netflix', 'prime']}
      />
    );

    const netflixButton = screen.getByRole('button', { name: /netflix/i });
    const primeButton = screen.getByRole('button', { name: /prime/i });

    expect(netflixButton).toHaveClass('bg-red-600');
    expect(primeButton).toHaveClass('bg-blue-600');
  });

  it('calls onServiceChange when service is selected', () => {
    render(<StreamingFilter {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /netflix/i }));
    expect(defaultProps.onServiceChange).toHaveBeenCalledWith(['netflix']);
  });

  it('handles multiple service selection', () => {
    render(<StreamingFilter {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /netflix/i }));
    fireEvent.click(screen.getByRole('button', { name: /prime/i }));

    expect(defaultProps.onServiceChange).toHaveBeenLastCalledWith(['netflix', 'prime']);
  });

  it('toggles rental inclusion', () => {
    render(<StreamingFilter {...defaultProps} />);

    fireEvent.click(screen.getByRole('checkbox', { name: /include rentals/i }));
    expect(defaultProps.onRentalChange).toHaveBeenCalledWith(true);
  });

  it('changes country selection', () => {
    render(<StreamingFilter {...defaultProps} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'GB' }
    });

    expect(defaultProps.onCountryChange).toHaveBeenCalledWith('GB');
  });

  it('applies quick filter presets', () => {
    render(<StreamingFilter {...defaultProps} />);

    // Test "Subscriptions Only" preset
    fireEvent.click(screen.getByRole('button', { name: /subscriptions only/i }));
    expect(defaultProps.onServiceChange).toHaveBeenCalledWith(
      expect.arrayContaining(['netflix', 'prime', 'disney'])
    );
    expect(defaultProps.onRentalChange).toHaveBeenCalledWith(false);

    // Test "Clear All" preset
    fireEvent.click(screen.getByRole('button', { name: /clear all/i }));
    expect(defaultProps.onServiceChange).toHaveBeenCalledWith([]);
  });

  it('maintains selected services when changing country', () => {
    const selectedServices = ['netflix', 'prime'];
    render(
      <StreamingFilter
        {...defaultProps}
        selectedServices={selectedServices}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'GB' }
    });

    expect(defaultProps.onCountryChange).toHaveBeenCalledWith('GB');
    const netflixButton = screen.getByRole('button', { name: /netflix/i });
    const primeButton = screen.getByRole('button', { name: /prime/i });

    expect(netflixButton).toHaveClass('bg-red-600');
    expect(primeButton).toHaveClass('bg-blue-600');
  });

  it('shows appropriate loading states', () => {
    render(
      <StreamingFilter
        {...defaultProps}
        isLoading={true}
      />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('disabled');
    });
  });

  it('handles errors gracefully', () => {
    render(
      <StreamingFilter
        {...defaultProps}
        error="Failed to load streaming services"
      />
    );

    expect(screen.getByText(/failed to load streaming services/i))
      .toBeInTheDocument();
  });

  it('is accessible via keyboard', () => {
    render(<StreamingFilter {...defaultProps} />);

    const firstButton = screen.getByRole('button', { name: /netflix/i });
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    // Tab to next button
    fireEvent.keyDown(firstButton, { key: 'Tab' });
    const secondButton = screen.getByRole('button', { name: /prime/i });
    expect(document.activeElement).toBe(secondButton);
  });
});
