import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} The hashed password
 * @throws {Error} If password is empty or invalid
 */
export async function hashPassword(password) {
  if (!password || typeof password !== 'string' || password.trim() === '') {
    throw new Error('Password must be a non-empty string');
  }
  
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
} 