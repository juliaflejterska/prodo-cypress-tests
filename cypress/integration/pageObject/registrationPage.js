export default class RegistrationPage {
  constructor() {
    this.needToRegisterButton = 'form button[type="button"]';
    this.emailInput = 'form input[name="email"]';
    this.passwordInput = 'form input[name="password"]';
    this.registerButton = 'form button[type="submit"]';

    this.errorMessages = {
      emailRequired: "E-mail field is required",
      passwordRequired: "Password field is required",
      emailFormat: "Entered value does not match e-mail format",
      passwordLength: "Password must be at least 8 characters long",
    };
  }

  visitRegistrationPage() {
    cy.visit(Cypress.env("baseURL") + "/login");
    cy.get(this.needToRegisterButton).click();
  }

  register(email, password) {
    if (email !== "") {
      cy.get(this.emailInput).type(email);
    } else {
      cy.get(this.emailInput).clear();
    }

    if (password !== "") {
      cy.get(this.passwordInput).type(password);
    } else {
      cy.get(this.passwordInput).clear();
    }

    cy.get(this.registerButton).click();
  }

  getErrorMessage(messageType) {
    return cy.contains(this.errorMessages[messageType]);
  }
}
