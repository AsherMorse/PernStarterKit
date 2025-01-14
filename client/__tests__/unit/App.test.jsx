import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/App';

// Mock fetch globally
global.fetch = vi.fn();

function createFetchResponse(data) {
  return { json: () => Promise.resolve(data) };
}

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock the initial GET call to return count of 0 for every test
    fetch.mockResolvedValueOnce(createFetchResponse({ count: 0 }));
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays the welcome message', () => {
    render(<App />);
    expect(screen.getByText(/welcome to pern starter kit/i)).toBeInTheDocument();
  });

  it('displays initial count of 0 on render', async () => {
    render(<App />);
    const countText = await screen.findByText('Current count: 0');
    expect(countText).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/api/counter`);
  });

  it('increments count when button is clicked', async () => {
    // We already have the initial mock in beforeEach, so don’t mock it again
    render(<App />);
    const initialCountText = await screen.findByText('Current count: 0');
    expect(initialCountText).toBeInTheDocument();

    // Mock the POST (increment) response
    fetch.mockResolvedValueOnce(createFetchResponse({ count: 1 }));

    const incrementBtn = screen.getByRole('button', { name: /increment count/i });
    fireEvent.click(incrementBtn);

    const updatedCountText = await screen.findByText('Current count: 1');
    expect(updatedCountText).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledTimes(2); // one for GET, one for POST
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      `${import.meta.env.VITE_API_URL}/api/counter/increment`,
      expect.objectContaining({ method: 'POST' })
    );
  });
}); 