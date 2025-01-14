import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';

describe('Counter API Integration Tests', () => {
  beforeEach(() => {
    // If a reset function is available:
    // import { resetCount } from '../../src/routes/counter.js';
    // resetCount();
  });

  describe('GET /api/counter', () => {
    it('should return the current count', async () => {
      const response = await request(app)
        .get('/api/counter')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).to.have.property('count');
      expect(response.body.count).to.equal(0);
    });
  });

  describe('POST /api/counter/increment', () => {
    it('should increment the count and return the new value', async () => {
      // First, verify initial count is 0
      let response = await request(app)
        .get('/api/counter')
        .expect(200);
      expect(response.body.count).to.equal(0);

      // Increment the counter
      response = await request(app)
        .post('/api/counter/increment')
        .expect('Content-Type', /json/)
        .expect(200);

      // Verify the response shows incremented value
      expect(response.body).to.have.property('count');
      expect(response.body.count).to.equal(1);

      // Verify GET endpoint also shows the new value
      response = await request(app)
        .get('/api/counter')
        .expect(200);
      expect(response.body.count).to.equal(1);
    });
  });
}); 