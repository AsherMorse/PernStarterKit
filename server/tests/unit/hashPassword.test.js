import { expect } from 'chai';
import { hashPassword } from '../../src/utils/hashPassword.js';

describe('hashPassword utility', () => {
  it('should return a hashed password', async () => {
    const plainPassword = 'mysecret123';
    const hashed = await hashPassword(plainPassword);
    expect(hashed).to.be.a('string');
    expect(hashed).to.not.equal(plainPassword);
    expect(hashed).to.have.length.above(50); // bcrypt hashes are typically longer than 50 chars
  });

  it('should generate different hashes for the same password', async () => {
    const plainPassword = 'mysecret123';
    const hash1 = await hashPassword(plainPassword);
    const hash2 = await hashPassword(plainPassword);
    expect(hash1).to.not.equal(hash2); // Each hash should be unique due to salt
  });

  it('should throw an error if password is empty', async () => {
    try {
      await hashPassword('');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Password must be a non-empty string');
    }
  });

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