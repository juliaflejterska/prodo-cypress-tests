Cypress.Commands.add("validateAlert", (expectedText) => {
  cy.on("window:alert", (alertText) => {
    expect(alertText).to.contain(expectedText);
  });
});

Cypress.Commands.add("validateModal", (expectedText) => {
  cy.get(".modal", { timeout: 5000 }).should("be.visible");
  cy.get(".modal-body").should("contain", expectedText);
});

Cypress.Commands.add("loginWithValidCredentials", () => {
  cy.visit(Cypress.env("baseURL") + "/login");
  cy.get('form input[name="email"]').type("test@test.com");
  cy.get('form input[name="password"]').type("12345678");
  cy.get('form button[type="submit"]').contains("LOG IN").click();
});
