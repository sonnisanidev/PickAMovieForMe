import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from './pages';

test('renders home page', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const headingElement = screen.getByText(/Pick A Movie For Me/i);
  expect(headingElement).toBeInTheDocument();
});
