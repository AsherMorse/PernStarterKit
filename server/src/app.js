import express from 'express';
import cors from 'cors';
import { securityMiddleware } from './config/security.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth.js';
import counterRoutes from './routes/counter.js';

const app = express();

// Apply security middleware (helmet, rate limiting, etc.)
app.use(securityMiddleware);

// CORS config
app.use(cors({
  origin: process.env.API_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sessions & Passport
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

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/counter', counterRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app; 