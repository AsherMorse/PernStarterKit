/**
 * home.cy.js - Home Page End-to-End Tests
 * 
 * End-to-end tests for the application's home page using Cypress.
 * Verifies core functionality and content of the landing page.
 * 
 * @group E2E Tests
 * @group Home Page
 */

describe('Home Page', () => {
  /**
   * Before each test, visit the home page
   * This ensures a clean state for each test
   */
  beforeEach(() => {
    cy.visit('/');
  });

  /**
   * Test the main heading content
   * Verifies the welcome message is displayed correctly
   */
  it('should display the welcome message', () => {
    cy.get('h1').should('contain', 'Welcome to PERN Starter Kit');
  });

  /**
   * Test the description text
   * Verifies the application description is present
   */
  it('should display the description', () => {
    cy.get('p').should('contain', 'A modern full-stack starter template');
  });
}); 