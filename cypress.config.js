const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/tests/*.js",
    env: {
      baseURL: "https://prodo-tracker.netlify.app",
      quoteApiURL: "https://type.fit/api/quotes",
    },
  },
});
