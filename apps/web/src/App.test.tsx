import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { App } from './App';

afterEach(() => cleanup());

describe('R1 route foundation', () => {
  it('renders the public landing page', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /every family has a story/i })).toBeTruthy();
  });

  it('renders the people route for the requested family workspace', () => {
    window.history.pushState({}, '', '/families/family-123/people');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'People' })).toBeTruthy();
    expect(screen.getByText(/authenticated family API is connected/i)).toBeTruthy();
  });
});
