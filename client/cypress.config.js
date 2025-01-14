import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5173',
    specPattern: '__tests__/e2e/**/*.cy.{js,jsx}',
    supportFile: '__tests__/e2e/support/e2e.js',
    videosFolder: '__tests__/cypress/videos',
    screenshotsFolder: '__tests__/cypress/screenshots',
    env: {
      apiUrl: process.env.CYPRESS_API_URL || 'http://localhost:3000',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});