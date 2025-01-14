-- init.sql - PERN Stack Database Initialization
--
-- This script initializes the PostgreSQL database schema for the PERN Stack application.
-- It creates necessary tables and populates them with initial data.
--
-- Tables:
--   users - Stores user authentication and profile data
--   example - Example table for demonstration purposes
--
-- Note: 
--   - All tables include created_at timestamp for audit purposes
--   - Passwords should be hashed before insertion
--   - Table names use snake_case as per convention
--   - All tables use SERIAL PRIMARY KEY for auto-incrementing IDs

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create example table
CREATE TABLE IF NOT EXISTS example (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add some example data
-- Note: This is for demonstration only and should be removed in production
INSERT INTO example (name) VALUES ('Example 1'), ('Example 2'); 