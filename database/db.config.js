/**
 * db.config.js - Database Connection Configuration
 * 
 * This module configures and exports a PostgreSQL connection pool for the application.
 * It handles both production and test environments, using appropriate environment variables.
 * 
 * Features:
 * - Single connection pool instance (singleton pattern)
 * - Automatic test environment detection
 * - Error handling for unexpected connection issues
 * 
 * Environment Variables Required:
 * - DB_USER: Database user
 * - DB_PASSWORD: Database password
 * - DB_HOST: Database host
 * - DB_PORT: Database port
 * - DB_NAME: Database name
 * - NODE_ENV: Application environment ('test' or 'production')
 * 
 * Usage:
 *   import pool from './db.config.js';
 *   const result = await pool.query('SELECT NOW()');
 */

import pkg from 'pg';
const { Pool } = pkg;

// Load test environment variables if in test mode
if (process.env.NODE_ENV === 'test') {
  import('dotenv').then(dotenv => {
    dotenv.config({ path: '.env.test' });
  });
}

/**
 * PostgreSQL connection pool instance
 * Uses environment variables for configuration
 * @type {Pool}
 */
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

// Handle unexpected errors on idle clients
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool; 