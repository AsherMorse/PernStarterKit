describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the welcome message', () => {
    cy.get('h1').should('contain', 'Welcome to PERN Starter Kit');
  });

  it('should display the description', () => {
    cy.get('p').should('contain', 'A modern full-stack starter template');
  });
}); 