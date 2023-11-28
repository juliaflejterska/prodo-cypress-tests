export default class ExpensesPage {
  elements = {
    titleInput: 'form input[type="text"][placeholder="Enter title"]',
    amountInput: 'form input[inputmode="numeric"][type="text"]',
    submitButton: 'form button[type="submit"]',
    balanceLabel:
      ".d-flex.justify-content-around.align-items-center.text-center.gap-3 span:contains('BALANCE')",
    incomeLabel:
      ".d-flex.justify-content-around.align-items-center.text-center.gap-3 span:contains('INCOME')",
    expenseLabel:
      ".d-flex.justify-content-around.align-items-center.text-center.gap-3 span:contains('EXPENSE')",
    transactionTexts: ".d-flex.flex-column > div > div:last-child > span",
    transactionValues: ".d-flex.flex-column > div > div:first-child > span",
  };

  navigate() {
    cy.get('a[href="/expenses"]').click();
  }

  addTransaction(title, amount) {
    cy.get(this.elements.titleInput).clear();
    if (title !== "") {
      cy.get(this.elements.titleInput).type(title);
    }

    cy.get(this.elements.amountInput).clear();
    if (amount !== "") {
      cy.get(this.elements.amountInput).type(amount);
    }

    cy.get(this.elements.submitButton).click();
  }

  checkTransaction(title, amount) {
    cy.get(this.elements.transactionTexts).eq(0).should("contain", title);

    const stringAmount = amount.toString();
    const isNegative = stringAmount.startsWith("-");
    const displayAmount = isNegative
      ? "-$" + stringAmount.slice(1)
      : "+$" + stringAmount;
    const expectedColor = isNegative ? "rgb(208, 0, 0)" : "rgb(19, 111, 99)";

    cy.get(this.elements.transactionValues)
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
    cy.get(this.elements.amountInput)
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
    return cy.get(this.elements.transactionTexts);
  }

  getTransactionValues() {
    return cy.get(this.elements.transactionValues);
  }

  removeTransaction(title) {
    cy.get(this.elements.transactionTexts)
      .contains(title)
      .parent()
      .parent()
      .first()
      .find("svg")
      .click();
  }

  checkTransactionIsDeleted(title) {
    cy.get(this.elements.transactionTexts).eq(0).should("not.contain", title);
  }
}
