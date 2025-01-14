/**
 * hash-password.test.js - Password Hashing Unit Tests
 * 
 * Tests the password hashing utility function to ensure secure password handling.
 * Verifies hash generation, uniqueness, and input validation.
 * 
 * Test Cases:
 * 1. Basic hash generation
 * 2. Hash uniqueness with same input
 * 3. Empty password validation
 * 4. Whitespace-only password validation
 */

import { expect } from 'chai';
import { hashPassword } from '../../src/utils/hash-password.js';

describe('hash-password utility', () => {
  /**
   * Test basic hash generation functionality
   * Verifies that:
   * - Output is a string
   * - Hash is different from input
   * - Hash length meets bcrypt standards
   */
  it('should return a hashed password', async () => {
    const plainPassword = 'mysecret123';
    const hashed = await hashPassword(plainPassword);
    expect(hashed).to.be.a('string');
    expect(hashed).to.not.equal(plainPassword);
    expect(hashed).to.have.length.above(50); // bcrypt hashes are typically longer than 50 chars
  });

  /**
   * Test hash uniqueness
   * Verifies that multiple hashes of the same password are different
   * due to random salt generation
   */
  it('should generate different hashes for the same password', async () => {
    const plainPassword = 'mysecret123';
    const hash1 = await hashPassword(plainPassword);
    const hash2 = await hashPassword(plainPassword);
    expect(hash1).to.not.equal(hash2); // Each hash should be unique due to salt
  });

  /**
   * Test empty password validation
   * Verifies that empty strings are rejected
   */
  it('should throw an error if password is empty', async () => {
    try {
      await hashPassword('');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Password must be a non-empty string');
    }
  });

  /**
   * Test whitespace password validation
   * Verifies that strings containing only whitespace are rejected
   */
  it('should throw an error if password is only whitespace', async () => {
    try {
      await hashPassword('   ');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Password must be a non-empty string');
    }
  });
}); 