import LoginPage from "../pageObject/loginPage";
const loginData = require("../../fixtures/loginData.json");

describe("Login tests", () => {
  const loginPage = new LoginPage();
  beforeEach(() => {
    loginPage.visitLoginPage();
  });

  const { validUser, invalidUser } = loginData;

  it("Successfully logs in user with valid data", () => {
    loginPage.login(validUser.email, validUser.password);
    cy.url().should("contain", Cypress.env("baseURL"));
    cy.get('button[type="button"]').contains("LOG OUT").should("exist");
  });

  it("Fails to log in with a not registered email, proper alert should be displayed", () => {
    loginPage.login(invalidUser.email, invalidUser.password);
    cy.validateAlert(
      "Login failed: Please check your credentials and try again."
    );
  });

  it("Fails to log in with incorrect password, proper alert should be displayed", () => {
    loginPage.login(validUser.email, invalidUser.password);
    cy.validateAlert(
      "Login failed: Please check your credentials and try again."
    );
  });

  it("Fails to log in with with a blank email and password, proper error messages should be displayed", () => {
    loginPage.login("", "");
    loginPage.getEmailRequiredErrorMessage();
    loginPage.getPasswordRequiredErrorMessage();
  });
});
