import pkg from 'pg';
const { Client } = pkg;
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '../server/.env.test' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initTestDb() {
  // First connect to postgres database to create test database
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres'
  });

  try {
    await client.connect();
    
    // Drop test database if it exists
    await client.query(`
      DROP DATABASE IF EXISTS ${process.env.DB_NAME};
    `);

    // Create test database
    await client.query(`
      CREATE DATABASE ${process.env.DB_NAME};
    `);

    // Close connection to postgres database
    await client.end();

    // Connect to test database
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

initTestDb(); 