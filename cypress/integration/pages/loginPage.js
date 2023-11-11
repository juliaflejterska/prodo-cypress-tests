class LoginPage {
  constructor() {
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'form button[type="submit"].btn.btn-dark';
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

  getEmailRequiredErrorMessage() {
    return cy.contains("E-mail field is required");
  }

  getPasswordRequiredErrorMessage() {
    return cy.contains("Password field is required");
  }
}

export default LoginPage;
