import LoginPage from "../pageObject/loginPage";
const loginData = require("../../fixtures/loginData.json");

describe("Login - Functionality", () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visitLoginPage();
  });

  const { validUser, invalidUser } = loginData;

  context("Logging in", () => {
    it("Successfully logs in user with valid data", () => {
      loginPage.login(validUser.email, validUser.password);
      cy.url().should("contain", Cypress.env("baseURL"));
      cy.get('button[type="button"]').contains("LOG OUT").should("exist");
    });
  });

  context("Login errors validation", () => {
    it("Displays proper alert for not registered email", () => {
      loginPage.login(invalidUser.email, invalidUser.password);
      cy.validateAlert(
        "Login failed: Please check your credentials and try again."
      );
    });

    it("Displays proper alert for incorrect password", () => {
      loginPage.login(validUser.email, invalidUser.password);
      cy.validateAlert(
        "Login failed: Please check your credentials and try again."
      );
    });

    it("Displays proper error messages for blank email and password", () => {
      loginPage.login("", "");
      loginPage.getErrorMessage("emailRequired").should("exist");
      loginPage.getErrorMessage("passwordRequired").should("exist");
    });
  });
});
