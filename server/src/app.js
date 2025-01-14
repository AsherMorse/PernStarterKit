/**
 * app.js - Express Application Configuration
 * 
 * This module sets up the Express application with all necessary middleware,
 * security configurations, and route handlers.
 * 
 * Environment Variables:
 * - API_URL: Frontend URL for CORS (default: http://localhost:5173)
 * - SESSION_SECRET: Secret for session management
 * - NODE_ENV: Environment mode (development/production)
 */

import express from 'express';
import cors from 'cors';
import { securityMiddleware } from './config/security.config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth.routes.js';
import counterRoutes from './routes/counter.routes.js';

const app = express();

// Security middleware (helmet, rate limiting, etc.)
app.use(securityMiddleware);

// CORS configuration with credentials support
app.use(cors({
  origin: process.env.API_URL || 'http://localhost:5173',
  credentials: true,
}));

// Request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration with security options
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 86400000, // 24 hours
  },
}));

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/counter', counterRoutes);

/**
 * Global error handler
 * Catches all unhandled errors and sends a generic response
 * 
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 