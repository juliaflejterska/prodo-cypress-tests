import GoalsPage from "../pageObject/goalsPage";
import goalsData from "../../fixtures/goalsData";

describe("Goals tracker - Functionality", () => {
  const goalsPage = new GoalsPage();

  beforeEach(() => {
    cy.loginWithValidCredentials();
    goalsPage.navigate();
  });

  const { validGoal, invalidGoal } = goalsData;

  context("Creating goals", () => {
    it("Adds a goal and displays it in the correct category", () => {
      goalsPage.addGoal(validGoal.title, validGoal.category);
      goalsPage.checkGoal(validGoal.title);

      goalsPage.getCategorySelect().click();
      goalsPage.getCategorySelect().contains(validGoal.category).click();
      goalsPage.checkGoal(validGoal.title);
    });
  });

  context("Creating goals error validation", () => {
    it("Displays proper alert for adding a goal without a title", () => {
      goalsPage.addGoal(invalidGoal.title, invalidGoal.category);
      cy.validateModal("Title cannot be empty. Please enter a valid title.");
    });
  });

  context("Goals deletion", () => {
    it("Removes the added goal", () => {
      goalsPage.addGoal(validGoal.title, validGoal.category);
      goalsPage.removeGoal(validGoal.title);
      goalsPage.checkGoalIsDeleted(validGoal.title);
    });
  });
});
