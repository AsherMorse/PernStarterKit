// Import commands.js using ES2015 syntax:
import './commands';

// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Custom command to login
Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: {
      username,
      password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

// Custom command to register
Cypress.Commands.add('register', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/register`,
    body: {
      username,
      password,
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
}); 