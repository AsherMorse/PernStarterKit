describe('Counter E2E Tests', () => {
  beforeEach(() => {
    // Intercept the initial GET request to always return count as 0
    cy.intercept('GET', `${Cypress.env('apiUrl')}/api/counter`, {
      statusCode: 200,
      body: { count: 0 }
    }).as('getCounter');

    // Visit the homepage
    cy.visit('/');
    cy.wait('@getCounter');
  });

  it('shows initial count as 0 and increments when clicked', () => {
    // Check initial state
    cy.contains('Current count: 0').should('be.visible');
    cy.contains('button', 'Increment Count').should('be.visible');

    // Intercept the POST request to return incremented count
    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/counter/increment`, {
      statusCode: 200,
      body: { count: 1 }
    }).as('incrementCounter');

    // Click the increment button
    cy.contains('button', 'Increment Count').click();
    cy.wait('@incrementCounter');

    // Verify the count increased
    cy.contains('Current count: 1').should('be.visible');
  });

  it('tracks multiple consecutive increments correctly', () => {
    // Check initial state
    cy.contains('Current count: 0').should('be.visible');
    
    // Setup intercepts for multiple increments
    let currentCount = 0;
    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/counter/increment`, (req) => {
      currentCount += 1;
      req.reply({
        statusCode: 200,
        body: { count: currentCount }
      });
    }).as('incrementCounter');

    // Perform multiple clicks and verify each increment
    const clickCount = 3;
    for (let i = 0; i < clickCount; i++) {
      cy.contains('button', 'Increment Count').click();
      cy.wait('@incrementCounter');
      cy.contains(`Current count: ${i + 1}`).should('be.visible');
    }
  });

  it('persists count after page reload', () => {
    // Setup initial count as 5
    cy.intercept('GET', `${Cypress.env('apiUrl')}/api/counter`, {
      statusCode: 200,
      body: { count: 5 }
    }).as('getInitialCounter');

    // Load page and verify initial count
    cy.visit('/');
    cy.wait('@getInitialCounter');
    cy.contains('Current count: 5').should('be.visible');

    // Increment once
    cy.intercept('POST', `${Cypress.env('apiUrl')}/api/counter/increment`, {
      statusCode: 200,
      body: { count: 6 }
    }).as('incrementCounter');
    cy.contains('button', 'Increment Count').click();
    cy.wait('@incrementCounter');
    cy.contains('Current count: 6').should('be.visible');

    // Setup intercept for the reload
    cy.intercept('GET', `${Cypress.env('apiUrl')}/api/counter`, {
      statusCode: 200,
      body: { count: 6 }
    }).as('getCounterAfterReload');

    // Reload page and verify count persists
    cy.reload();
    cy.wait('@getCounterAfterReload');
    cy.contains('Current count: 6').should('be.visible');
  });
}); 