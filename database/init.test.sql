-- init.test.sql - PERN Stack Test Database Initialization
--
-- This script initializes a clean test database for running automated tests.
-- It drops and recreates all tables to ensure a pristine test environment.
--
-- Tables:
--   users - Test user accounts with additional email field
--   example - Example table matching production schema
--
-- Note: 
--   - All tables are dropped with CASCADE to ensure clean state
--   - Schema matches production but may include test-specific fields
--   - No sample data is included (should be added in specific test files)
--   - All tables include created_at timestamp for consistency
--
-- Usage:
--   This script should be run before each test suite execution
--   to ensure a clean, consistent test environment.

-- Create users table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create example table
DROP TABLE IF EXISTS example CASCADE;
CREATE TABLE example (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 