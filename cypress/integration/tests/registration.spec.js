import RegistrationPage from "../pages/registrationPage";
const registrationPage = new RegistrationPage();

describe("Registration tests", () => {
  beforeEach(() => {
    registrationPage.visitRegistrationPage();
  });

  const registrationData = require("../../fixtures/registrationData.json");
  const { validUser, invalidUser, invalidEmailUser, shortPasswordUser } =
    registrationData;

  // it("Successfully registers a user with valid data and logs them in as a registered user", () => {
  //   registrationPage.register(validUser.email, validUser.password);
  //   cy.url().should("contain", Cypress.env("baseURL"));
  //   cy.get('button[type="button"]').contains("LOG OUT").should("exist");
  // });

  it("Fails to register with an already registered email, proper alert should be displayed", () => {
    registrationPage.register(invalidUser.email, invalidUser.password);
    cy.wait(5000);
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contains(
        "Registration failed: An account with this email address already exists."
      );
    });
  });

  it("Fails to register with a blank email and password, proper error messages should be displayed", () => {
    registrationPage.register("", "");
    registrationPage.getEmailRequiredErrorMessage().should("exist");
    registrationPage.getPasswordRequiredErrorMessage().should("exist");
  });

  it("Fails to register with an empty email, proper error message should be displayed", () => {
    registrationPage.register("", invalidUser.password);
    registrationPage.getEmailRequiredErrorMessage().should("exist");
  });

  it("Fails to register with an empty password, proper error message should be displayed", () => {
    registrationPage.register(invalidUser.email, "");
    registrationPage.getPasswordRequiredErrorMessage().should("exist");
  });

  it("Fails to register with an invalid email format, proper error message should be displayed", () => {
    registrationPage.register(
      invalidEmailUser.email,
      invalidEmailUser.password
    );
    registrationPage.getEmailFormatErrorMessage().should("exist");
  });

  it("Fails to register with a password that is too short, proper error message should be displayed", () => {
    registrationPage.register(
      shortPasswordUser.email,
      shortPasswordUser.password
    );
    registrationPage.getPasswordLengthErrorMessage().should("exist");
  });
});
