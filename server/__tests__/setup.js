/**
 * setup.js - Test Environment Configuration
 * 
 * This module configures the test environment for server-side tests.
 * Sets up Chai with HTTP plugin, environment variables, and test mocks.
 * 
 * Environment Variables Set:
 * - NODE_ENV: 'test'
 * - PORT: 5001
 * 
 * Features:
 * - Chai HTTP testing support
 * - Global expect assertion
 * - Session middleware mock
 */

import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

// Load test-specific environment variables
dotenv.config({ path: '.env.test' });

// Configure test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

// Set up Chai with HTTP plugin
chai.use(chaiHttp);
chai.should();

// Make Chai's expect globally available for tests
global.expect = chai.expect;

/**
 * Creates a mock session middleware for testing
 * Simulates express-session functionality without database
 * 
 * @returns {Function} Express middleware function
 * @example
 *   app.use(mockSession());
 */
const mockSession = () => {
  return (req, res, next) => {
    req.session = {
      destroy: (cb) => cb?.(),
      save: (cb) => cb?.(),
      regenerate: (cb) => cb?.()
    };
    next();
  };
};

export { mockSession }; 