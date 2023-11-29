import ExpensesPage from "../pageObject/expensesPage";
import expensesData from "../../fixtures/expensesData";

describe("Expenses tracker - Functionality", () => {
  const expensesPage = new ExpensesPage();

  beforeEach(() => {
    cy.loginWithValidCredentials();
    expensesPage.navigate();
  });

  const {
    validIncome,
    validExpense,
    validDecimalTransaction,
    invalidTransaction,
    invalidTransactionTitle,
    invalidTransactionAmount,
    invalidTransactionZeroAmount,
    invalidAmount,
  } = expensesData;

  context("Creating transactions", () => {
    it("Creates income and checks balance", () => {
      expensesPage.getInitialValues().then((initialValues) => {
        expensesPage.addTransaction(validIncome.title, validIncome.amount);
        expensesPage.checkTransaction(validIncome.title, validIncome.amount);
        expensesPage.checkBalanceAfterTransaction(
          initialValues,
          validIncome.amount
        );
      });
    });

    it("Creates an expense and checks balance", () => {
      expensesPage.getInitialValues().then((initialValues) => {
        expensesPage.addTransaction(validExpense.title, validExpense.amount);
        expensesPage.checkTransaction(validExpense.title, validExpense.amount);
        expensesPage.checkBalanceAfterTransaction(
          initialValues,
          validExpense.amount
        );
      });
    });

    it("Creates a transaction with decimal amount and checks balance", () => {
      expensesPage.getInitialValues().then((initialValues) => {
        expensesPage.addTransaction(
          validDecimalTransaction.title,
          validDecimalTransaction.amount
        );
        expensesPage.checkTransaction(
          validDecimalTransaction.title,
          validDecimalTransaction.amount
        );
        expensesPage.checkBalanceAfterTransaction(
          initialValues,
          validDecimalTransaction.amount
        );
      });
    });
  });

  context("Failing to create transactions", () => {
    it("Fails to create a transaction without a title and an amount, proper alert should be displayed", () => {
      expensesPage.addTransaction(
        invalidTransaction.title,
        invalidTransaction.amount
      );
      cy.validateModal(
        "Title and amount cannot be empty. Please enter valid values."
      );
    });

    it("Fails to create a transaction without a title, proper alert should be displayed", () => {
      expensesPage.addTransaction(
        invalidTransactionTitle.title,
        invalidTransactionTitle.amount
      );
      cy.validateModal("Title cannot be empty. Please enter a valid title.");
    });

    it("Fails to create a transaction without an amount, proper alert should be displayed", () => {
      expensesPage.addTransaction(
        invalidTransactionAmount.title,
        invalidTransactionAmount.amount
      );
      cy.validateModal(
        "Amounts should be positive or negative values. Please enter a valid amount."
      );
    });

    it("Fails to create a transaction with 0 amount, proper alert should be displayed", () => {
      expensesPage.addTransaction(
        invalidTransactionZeroAmount.title,
        invalidTransactionZeroAmount.amount
      );
      cy.validateModal(
        "Amounts should be positive or negative values. Please enter a valid amount."
      );
    });
  });

  context("Sorting transactions", () => {
    it("Sorts transactions alphabetically", () => {
      // can directly check the sorting of transactions because the app's initial state already includes sample transactions
      expensesPage.sortAlphabetically();
      expensesPage.getTransactionTexts().then((transactionTexts) => {
        const sortedTexts = [...transactionTexts].map((el) =>
          el.innerText.toLowerCase()
        );
        const expectedOrder = sortedTexts.slice().sort();
        expect(sortedTexts).to.deep.equal(expectedOrder);
      });
    });

    it("Sorts transactions in ascending order", () => {
      expensesPage.sortAscending();
      expensesPage.getTransactionValues().then((transactionValues) => {
        const sortedValues = [...transactionValues].map((el) =>
          Number(el.innerText.replace(/[^-\d.]/g, ""))
        );
        const expectedOrder = [...sortedValues].sort((a, b) => a - b);
        expect(sortedValues).to.deep.equal(expectedOrder);
      });
    });

    it("Sorts transactions in descending order", () => {
      expensesPage.sortDescending();
      expensesPage.getTransactionValues().then((transactionValues) => {
        const sortedValues = [...transactionValues].map((el) =>
          Number(el.innerText.replace(/[^-\d.]/g, ""))
        );
        const expectedOrder = [...sortedValues].sort((a, b) => b - a);
        expect(sortedValues).to.deep.equal(expectedOrder);
      });
    });
  });

  context("Transaction deletion", () => {
    it("Removes the added transaction", () => {
      expensesPage.addTransaction(validIncome.title, validIncome.amount);
      expensesPage.removeTransaction(validIncome.title);
      expensesPage.checkTransactionIsDeleted(validIncome.title);
    });
  });

  context("Other tests", () => {
    it("Allows only numeric values in the amount field", () => {
      expensesPage.checkAmountIsNumeric(
        invalidAmount.amount,
        invalidAmount.expectedAmount
      );
    });
  });
});
