export default class LoginPage {
  constructor() {
    this.emailInput = 'form input[name="email"]';
    this.passwordInput = 'form input[name="password"]';
    this.loginButton = 'form button[type="submit"]';

    this.errorMessages = {
      emailRequired: "E-mail field is required",
      passwordRequired: "Password field is required",
    };
  }

  visitLoginPage() {
    cy.visit(Cypress.env("baseURL") + "/login");
  }

  login(email, password) {
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
    cy.get(this.loginButton).click();
  }

  getErrorMessage(messageType) {
    return cy.contains(this.errorMessages[messageType]);
  }
}
