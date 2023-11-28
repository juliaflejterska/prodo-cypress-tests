export default class LoginPage {
  elements = {
    emailInput: 'form input[name="email"]',
    passwordInput: 'form input[name="password"]',
    loginButton: 'form button[type="submit"]',
  };

  errorMessages = {
    emailRequired: "E-mail field is required",
    passwordRequired: "Password field is required",
  };

  visitLoginPage() {
    cy.visit(Cypress.env("baseURL") + "/login");
  }

  login(email, password) {
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

    cy.get(this.elements.loginButton).click();
  }

  getErrorMessage(messageType) {
    return cy.contains(this.errorMessages[messageType]);
  }
}
