import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import pool from '../../../database/db.js';

// Database helper functions
const getUserByUsername = async (username) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );
    return result.rows[0];
};

const getUserById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

// Configure Passport's Local Strategy
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

            // Remove password before returning user object
            delete user.password;
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        if (!user) {
            return done(new Error('User not found'));
        }
        // Remove password before returning user object
        delete user.password;
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport; 