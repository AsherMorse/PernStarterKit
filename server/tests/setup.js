import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PORT = 5001;

// Configure chai
chai.use(chaiHttp);
chai.should();

// Make expect available globally
global.expect = chai.expect;

// Mock express-session
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