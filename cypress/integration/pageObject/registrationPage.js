export default class RegistrationPage {
  elements = {
    needToRegisterButton: 'form button[type="button"]',
    emailInput: 'form input[name="email"]',
    passwordInput: 'form input[name="password"]',
    registerButton: 'form button[type="submit"]',
  };

  errorMessages = {
    emailRequired: "E-mail field is required",
    passwordRequired: "Password field is required",
    emailFormat: "Entered value does not match e-mail format",
    passwordLength: "Password must be at least 8 characters long",
  };

  visitRegistrationPage() {
    cy.visit(Cypress.env("baseURL") + "/login");
    cy.get(this.elements.needToRegisterButton).click();
  }

  register(email, password) {
    if (email !== "") {
      cy.get(this.elements.emailInput).type(email);
    } else {
      cy.get(this.elements.emailInput).clear();
    }

    if (password !== "") {
      cy.get(this.elements.passwordInput).type(password);
    } else {
      cy.get(this.elements.passwordInput).clear();
    }

    cy.get(this.elements.registerButton).click();
  }

  getErrorMessage(messageType) {
    return cy.contains(this.errorMessages[messageType]);
  }
}
