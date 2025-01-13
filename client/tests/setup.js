import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables
process.env.VITE_API_URL = 'http://localhost:3001';

// Setup test environment
beforeAll(() => {
  // Add any global test setup here
});

afterEach(() => {
  vi.clearAllMocks();
}); 