export default class GoalsPage {
  elements = {
    titleInput: 'form input[type="text"][placeholder="Enter title"]',
    formCategorySelect: "form #goals-select",
    submitButton: 'form button[type="submit"]',
    categorySelect: "#category-select",
    goalsText: '[style="width: 100%;"] > :nth-child(3) span',
  };

  navigate() {
    cy.get('a[href="/goals"]').click();
  }

  addGoal(title, category) {
    cy.get(this.elements.titleInput).clear();
    if (title !== "") {
      cy.get(this.elements.titleInput).type(title);
    }

    cy.get(this.elements.formCategorySelect).click();
    cy.get(this.elements.formCategorySelect).contains(category).click();

    cy.get(this.elements.submitButton).click();
  }

  checkGoal(title) {
    cy.get(this.elements.goalsText).eq(0).should("contain", title);
  }

  getCategorySelect() {
    return cy.get(this.elements.categorySelect);
  }

  removeGoal(title) {
    cy.get(this.elements.goalsText)
      .contains(title)
      .parent()
      .first()
      .find("svg")
      .click();
  }

  checkGoalIsDeleted(title) {
    cy.get(this.elements.goalsText).eq(0).should("not.contain", title);
  }
}
