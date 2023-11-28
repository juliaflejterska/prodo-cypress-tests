export default class QuotesPage {
  elements = {
    quote: "section p:first-of-type",
    quoteAuthor: "section p:nth-of-type(2)",
    changeQuoteButton: 'section button[type="button"]',
  };

  getQuote() {
    return cy.get(this.elements.quote);
  }

  getQuoteAuthor() {
    return cy.get(this.elements.quoteAuthor);
  }

  changeQuote() {
    return cy.get(this.elements.changeQuoteButton).click();
  }

  loadQuotesFromExternalAPI() {
    return cy.intercept("GET", Cypress.env("quoteApiURL")).as("quoteAPI");
  }
}
