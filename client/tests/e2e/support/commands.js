// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Example custom command for checking if an element is visible and contains text
Cypress.Commands.add('containsAndVisible', { prevSubject: false }, (selector, text) => {
  cy.get(selector).should('be.visible').and('contain', text);
});

// Example custom command for waiting for API response
Cypress.Commands.add('waitForApi', (method, url) => {
  cy.intercept(method, url).as('apiCall');
  cy.wait('@apiCall');
}); 