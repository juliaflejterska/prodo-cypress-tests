import RegistrationPage from "../pageObject/registrationPage";
const registrationData = require("../../fixtures/registrationData.json");

describe("Registration - Functionality", () => {
  const registrationPage = new RegistrationPage();

  beforeEach(() => {
    registrationPage.visitRegistrationPage();
  });

  const { validUser, invalidUser, invalidEmailUser, shortPasswordUser } =
    registrationData;

  context("Registration", () => {
    // it("Successfully registers a user with valid data and logs them in as a registered user", () => {
    //   registrationPage.register(validUser.email, validUser.password);
    //   cy.url().should("contain", Cypress.env("baseURL"));
    //   cy.get('button[type="button"]').contains("LOG OUT").should("exist");
    // })
  });

  context("Failing to register", () => {
    it("Fails to register with an already registered email, proper alert should be displayed", () => {
      registrationPage.register(invalidUser.email, invalidUser.password);
      cy.validateAlert(
        "Registration failed: An account with this email address already exists."
      );
    });

    it("Fails to register with empty email and password, proper error messages should be displayed", () => {
      registrationPage.register("", "");
      registrationPage.getErrorMessage("emailRequired").should("exist");
      registrationPage.getErrorMessage("passwordRequired").should("exist");
    });

    it("Fails to register with an empty email, proper error message should be displayed", () => {
      registrationPage.register("", invalidUser.password);
      registrationPage.getErrorMessage("emailRequired").should("exist");
    });

    it("Fails to register with an empty password, proper error message should be displayed", () => {
      registrationPage.register(invalidUser.email, "");
      registrationPage.getErrorMessage("passwordRequired").should("exist");
    });

    it("Fails to register with an invalid email format, proper error message should be displayed", () => {
      registrationPage.register(
        invalidEmailUser.email,
        invalidEmailUser.password
      );
      registrationPage.getErrorMessage("emailFormat").should("exist");
    });

    it("Fails to register with a password that is too short, proper error message should be displayed", () => {
      registrationPage.register(
        shortPasswordUser.email,
        shortPasswordUser.password
      );
      registrationPage.getErrorMessage("passwordLength").should("exist");
    });
  });
});
