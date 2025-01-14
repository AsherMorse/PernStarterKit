/**
 * passport.js - Authentication Configuration
 * 
 * This module configures Passport.js authentication strategies and session handling.
 * Uses Local Strategy with username/password and PostgreSQL for user storage.
 * 
 * Security Features:
 * - Password hashing with bcrypt
 * - Automatic password field removal from user objects
 * - Session-based authentication
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import pool from '../../../database/db.config.js';

/**
 * Retrieves a user by username from the database
 * 
 * @param {string} username - The username to search for
 * @returns {Promise<Object|null>} User object if found, null otherwise
 */
const getUserByUsername = async (username) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );
    return result.rows[0];
};

/**
 * Retrieves a user by ID from the database
 * 
 * @param {number} id - The user ID to search for
 * @returns {Promise<Object|null>} User object if found, null otherwise
 */
const getUserById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

// Configure Local Strategy for username/password authentication
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            // Remove sensitive data before serialization
            delete user.password;
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

/**
 * Serializes user object for session storage
 * Only stores user ID in session for security
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/**
 * Deserializes user from session
 * Retrieves full user object from database using stored ID
 */
passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        if (!user) {
            return done(new Error('User not found'));
        }
        // Remove sensitive data after deserialization
        delete user.password;
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport; 