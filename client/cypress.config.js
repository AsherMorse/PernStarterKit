import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5173',
    specPattern: 'tests/e2e/**/*.cy.{js,jsx}',
    supportFile: 'tests/e2e/support/e2e.js',
    videosFolder: 'tests/cypress/videos',
    screenshotsFolder: 'tests/cypress/screenshots',
    env: {
      apiUrl: process.env.CYPRESS_API_URL || 'http://localhost:3000',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});