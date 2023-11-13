export default class QuotesPage {
  constructor() {
    this.quote = "section p:first-of-type";
    this.quoteAuthor = "section p:nth-of-type(2)";
    this.changeQuoteButton = 'section button[type="button"]';
  }

  getQuote() {
    return cy.get(this.quote);
  }

  getQuoteAuthor() {
    return cy.get(this.quoteAuthor);
  }

  changeQuote() {
    return cy.get(this.changeQuoteButton).click();
  }

  loadQuotesFromExternalAPI() {
    return cy.intercept("GET", Cypress.env("quoteApiURL")).as("quoteAPI");
  }
}
