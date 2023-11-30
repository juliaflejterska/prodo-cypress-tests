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
      expensesPage.checkTransactionInLocalStorage(validIncome.title);
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
      expensesPage.checkTransactionInLocalStorage(validExpense.title);
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
      expensesPage.checkTransactionInLocalStorage(
        validDecimalTransaction.title
      );
    });
  });

  context("Creating transactions errors validation", () => {
    it("Displays proper alert for a transaction without a title and amount", () => {
      expensesPage.addTransaction(
        invalidTransaction.title,
        invalidTransaction.amount
      );
      cy.validateModal(
        "Title and amount cannot be empty. Please enter valid values."
      );
    });

    it("Displays proper alert for a transaction without a title", () => {
      expensesPage.addTransaction(
        invalidTransactionTitle.title,
        invalidTransactionTitle.amount
      );
      cy.validateModal("Title cannot be empty. Please enter a valid title.");
    });

    it("Displays proper alert for a transaction without an amount", () => {
      expensesPage.addTransaction(
        invalidTransactionAmount.title,
        invalidTransactionAmount.amount
      );
      cy.validateModal(
        "Amounts should be positive or negative values. Please enter a valid amount."
      );
    });

    it("Displays proper alert for a transaction with 0 amount", () => {
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
    it("deletes the added transaction", () => {
      expensesPage.addTransaction(validIncome.title, validIncome.amount);
      expensesPage.deleteTransaction(validIncome.title);
      expensesPage.checkTransactionIsDeleted(validIncome.title);
      expensesPage.checkTransactionDeletedInLocalStorage(validIncome.title);
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
