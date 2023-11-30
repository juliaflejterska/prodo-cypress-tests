import QuotesPage from "../pageObject/quotesPage";

describe("Quotes - Functionality", () => {
  const quotesPage = new QuotesPage();

  beforeEach(() => {
    cy.loginWithValidCredentials();
  });

  context("Displaying quotes", () => {
    it("Initially displays the first quote and changes the quote on button click", () => {
      cy.intercept("GET", Cypress.env("quoteApiURL")).as("quoteAPI");
      cy.wait("@quoteAPI").its("response.statusCode").should("eq", 200);

      quotesPage.assertQuoteVisibilityAndContent();

      quotesPage
        .getQuote()
        .invoke("text")
        .then((quote) => {
          cy.intercept("GET", Cypress.env("quoteApiURL")).as("quoteAPI");
          quotesPage.changeQuote();
          cy.wait("@quoteAPI").its("response.statusCode").should("eq", 200);
          quotesPage.assertChangedQuoteVisibilityAndContent(quote);
        });
    });
  });
});
