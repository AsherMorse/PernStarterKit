import pkg from 'pg';
const { Pool } = pkg;

// Load test environment variables if in test mode
if (process.env.NODE_ENV === 'test') {
  import('dotenv').then(dotenv => {
    dotenv.config({ path: '.env.test' });
  });
}

// Create a single pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Export the pool instance
export default pool; 