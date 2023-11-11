class RegistrationPage {
  constructor() {
    this.needToRegisterButton = 'form button[type="button"].btn.btn-secondary';
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.registerButton = 'form button[type="submit"].btn.btn-dark';
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

  getEmailRequiredErrorMessage() {
    return cy.contains("E-mail field is required");
  }

  getPasswordRequiredErrorMessage() {
    return cy.contains("Password field is required");
  }

  getEmailFormatErrorMessage() {
    return cy.contains("Entered value does not match e-mail format");
  }

  getPasswordLengthErrorMessage() {
    return cy.contains("Password must be at least 8 characters long");
  }
}

export default RegistrationPage;
