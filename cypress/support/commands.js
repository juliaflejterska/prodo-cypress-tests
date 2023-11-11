Cypress.Commands.add("validateAlert", (expectedText) => {
  cy.wait(5000);
  cy.on("window:alert", (alertText) => {
    expect(alertText).to.contains(expectedText);
  });
});
