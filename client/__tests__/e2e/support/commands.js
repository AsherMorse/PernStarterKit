/**
 * commands.js - Custom Cypress Commands
 * 
 * This file defines custom Cypress commands for end-to-end testing.
 * These commands extend Cypress's functionality for common testing patterns
 * in the PERN Stack application.
 * 
 * @see https://on.cypress.io/custom-commands
 */

/**
 * Custom command to check if an element is both visible and contains specific text
 * Combines two common assertions into a single command
 * 
 * @example
 *   cy.containsAndVisible('.header', 'Welcome');
 * 
 * @param {string} selector - CSS selector for the element
 * @param {string} text - Text to check for
 */
Cypress.Commands.add('containsAndVisible', { prevSubject: false }, (selector, text) => {
  cy.get(selector).should('be.visible').and('contain', text);
});

/**
 * Custom command to wait for an API call to complete
 * Useful for testing asynchronous operations
 * 
 * @example
 *   cy.waitForApi('GET', '/api/users');
 * 
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} url - API endpoint URL
 */
Cypress.Commands.add('waitForApi', (method, url) => {
  cy.intercept(method, url).as('apiCall');
  cy.wait('@apiCall');
}); 