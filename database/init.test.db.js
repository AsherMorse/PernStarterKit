/**
 * init.test.db.js - Test Database Initialization Script
 * 
 * This script automates the creation and initialization of the test database.
 * It drops any existing test database, creates a new one, and applies the test schema.
 * 
 * Process:
 * 1. Connects to default postgres database
 * 2. Drops existing test database if it exists
 * 3. Creates fresh test database
 * 4. Applies schema from init.test.sql
 * 
 * Environment Variables Required:
 * - DB_USER: Database user
 * - DB_PASSWORD: Database password
 * - DB_HOST: Database host
 * - DB_PORT: Database port
 * - DB_NAME: Test database name
 * 
 * Usage:
 *   node init.test.db.js
 */

import pkg from 'pg';
const { Client } = pkg;
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load test environment variables from server's test env file
dotenv.config({ path: '../server/.env.test' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Initializes the test database by creating it fresh and applying the schema
 * @throws {Error} If database initialization fails
 */
async function initTestDb() {
  // First connect to postgres database to create test database
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres'  // Connect to default postgres database
  });

  try {
    await client.connect();
    
    // Drop test database if it exists
    await client.query(`
      DROP DATABASE IF EXISTS ${process.env.DB_NAME};
    `);

    // Create fresh test database
    await client.query(`
      CREATE DATABASE ${process.env.DB_NAME};
    `);

    // Close connection to postgres database
    await client.end();

    // Connect to newly created test database
    const testClient = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    });

    await testClient.connect();

    // Read and execute the test schema
    const sqlPath = join(__dirname, 'init.test.sql');
    const sql = await readFile(sqlPath, 'utf8');
    await testClient.query(sql);

    console.log('Test database initialized successfully');
    await testClient.end();
  } catch (error) {
    console.error('Error initializing test database:', error);
    process.exit(1);
  }
}

// Execute the initialization
initTestDb(); 