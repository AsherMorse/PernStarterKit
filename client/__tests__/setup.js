/**
 * setup.js - Test Environment Configuration
 * 
 * Global setup for React component tests using Vitest and Testing Library.
 * Configures the test environment, mocks, and cleanup procedures.
 * 
 * Features:
 * - Jest DOM matchers for Testing Library
 * - Environment variable mocking
 * - Global test lifecycle hooks
 * - Automatic mock cleanup
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock API environment variable for consistent test environment
process.env.VITE_API_URL = 'http://localhost:3001';

/**
 * Global setup before all tests
 * Add initialization that should run once before any test
 */
beforeAll(() => {
  // Add any global test setup here
});

/**
 * Cleanup after each test
 * Ensures a clean state for the next test by clearing all mocks
 */
afterEach(() => {
  vi.clearAllMocks();
}); 