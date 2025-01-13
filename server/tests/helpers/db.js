import pool from '../../../database/db.js';

export const cleanDb = async () => {
  const client = await pool.connect();
  try {
    // Add tables to clean up here
    await client.query('TRUNCATE users CASCADE');
  } finally {
    client.release();
  }
};

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