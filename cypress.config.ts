import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportPageTitle: 'Star Wars Report',
    embeddedScreenshots: true,
    charts: true,
  },
  e2e: {
    "specPattern": "cypress/integration/",
    "watchForFileChanges": false,
    "baseUrl": "http://localhost:4200/",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
