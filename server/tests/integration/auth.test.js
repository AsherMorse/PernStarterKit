import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app.js';
import { mockSession } from '../setup.js';
import { cleanDb, checkDbConnection } from '../helpers/db.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentication API', () => {
  before(async () => {
    const isConnected = await checkDbConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }
  });

  beforeEach(async () => {
    await cleanDb();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123!'
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('message', 'User registered successfully');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.property('username', 'testuser');
      expect(res.body.user).to.have.property('email', 'test@example.com');
      expect(res.body.user).to.not.have.property('password');
    });

    it('should not register a duplicate username', async () => {
      // First register a user
      await chai
        .request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123!'
        });

      // Try to register the same username
      const res = await chai
        .request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'different@example.com',
          password: 'Password123!'
        });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Username already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user before each login test
      await chai
        .request(app)
        .post('/api/auth/register')
        .send({
          username: 'logintest',
          email: 'login@example.com',
          password: 'Password123!'
        });
    });

    it('should login an existing user', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'Password123!'
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Login successful');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.property('email', 'login@example.com');
      expect(res.body).to.have.property('token');
    });

    it('should not login with incorrect password', async () => {
      const res = await chai
        .request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPassword123!'
        });

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', 'Invalid credentials');
    });
  });
}); 