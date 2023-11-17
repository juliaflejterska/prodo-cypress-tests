export default class ExpensesPage {
  constructor() {
    this.titleInput = 'form input[type="text"][placeholder="Enter title"]';
    this.amountInput = 'form input[inputmode="numeric"][type="text"]';
    this.submitButton = 'form button[type="submit"]';
    this.balanceLabel =
      ".d-flex.justify-content-around.align-items-center.text-center.gap-3 span:contains('BALANCE')";
    this.incomeLabel =
      ".d-flex.justify-content-around.align-items-center.text-center.gap-3 span:contains('INCOME')";
    this.expenseLabel =
      ".d-flex.justify-content-around.align-items-center.text-center.gap-3 span:contains('EXPENSE')";
    this.transactionTexts = ".d-flex.flex-column > div > div:last-child > span";
    this.transactionValues =
      ".d-flex.flex-column > div > div:first-child > span";
  }

  addTransaction(title, amount) {
    cy.get(this.titleInput).clear();
    if (title !== "") {
      cy.get(this.titleInput).type(title);
    }

    cy.get(this.amountInput).clear();
    if (amount !== "") {
      cy.get(this.amountInput).type(amount);
    }

    cy.get(this.submitButton).click();
  }

  checkTransaction(title, amount) {
    cy.get(this.transactionTexts).eq(0).should("contain", title);

    const stringAmount = amount.toString();
    const isNegative = stringAmount.startsWith("-");
    const displayAmount = isNegative
      ? "-$" + stringAmount.slice(1)
      : "+$" + stringAmount;
    const expectedColor = isNegative ? "rgb(208, 0, 0)" : "rgb(19, 111, 99)";

    cy.get(this.transactionValues)
      .eq(0)
      .should("contain", displayAmount)
      .should("have.css", "color")
      .and("eq", expectedColor);
  }

  getNumericValue(label) {
    return cy
      .contains("span", label)
      .next("span")
      .invoke("text")
      .then((text) => {
        const numericValue = Number(text.replace(/[^-\d.]/g, ""));
        return isNaN(numericValue) ? 0 : numericValue;
      });
  }

  getInitialValues() {
    const labels = ["BALANCE", "INCOME", "EXPENSE"];
    let initialValues = {};

    labels.forEach((label) => {
      this.getNumericValue(label).then((value) => {
        initialValues[label] = value;
      });
    });

    return cy.wrap(initialValues);
  }

  checkBalanceAfterTransaction(initialValues, amount) {
    cy.get(
      ".d-flex.justify-content-around.align-items-center.text-center.gap-3"
    ).within(() => {
      this.getNumericValue("BALANCE").as("updatedBalance");
      this.getNumericValue("INCOME").as("updatedIncome");
      this.getNumericValue("EXPENSE").as("updatedExpense");

      cy.get("@updatedBalance").then((updatedBalance) => {
        cy.get("@updatedIncome").then((updatedIncome) => {
          cy.get("@updatedExpense").then((updatedExpense) => {
            const expectedBalance = initialValues.BALANCE + Number(amount);
            const expectedIncome =
              initialValues.INCOME + (Number(amount) > 0 ? Number(amount) : 0);
            const expectedExpense =
              initialValues.EXPENSE + (Number(amount) < 0 ? Number(amount) : 0);

            expect(updatedBalance).to.equal(expectedBalance);
            expect(updatedIncome).to.equal(expectedIncome);
            expect(updatedExpense).to.equal(expectedExpense);
          });
        });
      });
    });
  }

  checkAmountIsNumeric(amount, expectedAmount) {
    cy.get(this.amountInput)
      .type(amount, { force: true })
      .should("have.value", expectedAmount);
  }

  sortAlphabetically() {
    cy.contains("button", "SORT ALPH").click();
    cy.wait(1000);
  }

  sortAscending() {
    cy.contains("button", "SORT ASC").click();
    cy.wait(1000);
  }

  sortDescending() {
    cy.contains("button", "SORT DESC").click();
    cy.wait(1000);
  }

  getTransactionTexts() {
    return cy.get(this.transactionTexts);
  }

  getTransactionValues() {
    return cy.get(this.transactionValues);
  }

  removeTransaction(title) {
    cy.get(this.transactionTexts)
      .contains(title)
      .parent()
      .parent()
      .first()
      .find("svg")
      .click();
  }

  checkTransactionIsDeleted(title) {
    cy.get(this.transactionTexts).eq(0).should("not.contain", title);
  }
}
