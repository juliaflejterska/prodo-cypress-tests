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

  context("Registration errors validation", () => {
    it("Displays proper alert for already registered email", () => {
      registrationPage.register(invalidUser.email, invalidUser.password);
      cy.validateAlert(
        "Registration failed: An account with this email address already exists."
      );
    });

    it("Displays proper error messages for blank email and password", () => {
      registrationPage.register("", "");
      registrationPage.getErrorMessage("emailRequired").should("exist");
      registrationPage.getErrorMessage("passwordRequired").should("exist");
    });

    it("Displays proper error message for blank email", () => {
      registrationPage.register("", invalidUser.password);
      registrationPage.getErrorMessage("emailRequired").should("exist");
    });

    it("Displays proper error message for blank password", () => {
      registrationPage.register(invalidUser.email, "");
      registrationPage.getErrorMessage("passwordRequired").should("exist");
    });

    it("Displays proper error message for invalid email format", () => {
      registrationPage.register(
        invalidEmailUser.email,
        invalidEmailUser.password
      );
      registrationPage.getErrorMessage("emailFormat").should("exist");
    });

    it("Displays proper error message for too short password", () => {
      registrationPage.register(
        shortPasswordUser.email,
        shortPasswordUser.password
      );
      registrationPage.getErrorMessage("passwordLength").should("exist");
    });
  });
});
