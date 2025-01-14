/**
 * db-utils.js - Database Test Utilities
 * 
 * Helper functions for managing the test database state.
 * Provides utilities for cleaning and checking database connections.
 * 
 * Note: These functions should only be used in test environment.
 */

import pool from '../../../database/db.config.js';

/**
 * Cleans up test database by truncating all tables
 * Ensures a clean state before each test
 * 
 * @async
 * @throws {Error} If database operation fails
 * @example
 *   beforeEach(async () => {
 *     await cleanDb();
 *   });
 */
export const cleanDb = async () => {
  const client = await pool.connect();
  try {
    // Add tables to clean up here
    await client.query('TRUNCATE users CASCADE');
  } finally {
    client.release();
  }
};

/**
 * Checks if database connection is working
 * Useful for verifying test environment setup
 * 
 * @async
 * @returns {Promise<boolean>} True if connection successful, false otherwise
 * @example
 *   const isConnected = await checkDbConnection();
 *   if (!isConnected) {
 *     console.error('Database not available');
 *   }
 */
export const checkDbConnection = async () => {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  } finally {
    client.release();
  }
}; 