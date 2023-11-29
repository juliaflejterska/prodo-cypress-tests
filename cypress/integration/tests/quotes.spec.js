import QuotesPage from "../pageObject/quotesPage";

describe("Quotes - Functionality", () => {
  const quotesPage = new QuotesPage();

  beforeEach(() => {
    cy.loginWithValidCredentials();
  });

  context("Displaying quotes", () => {
    it("Initially displays the first quote and changes the quote on button click", () => {
      cy.wait(2500);

      quotesPage
        .getQuote()
        .should("be.visible")
        .invoke("text")
        .should("match", /"(.*)"/);
      quotesPage
        .getQuoteAuthor()
        .should("be.visible")
        .invoke("text")
        .should("not.be.empty");

      quotesPage
        .getQuote()
        .invoke("text")
        .then((quote) => {
          quotesPage.changeQuote();
          cy.wait(2500);
          quotesPage.getQuote().invoke("text").should("not.equal", quote);
        });
    });

    it("Dynamically loads quotes from an external quote API", () => {
      quotesPage.loadQuotesFromExternalAPI();
      quotesPage.changeQuote();
      cy.wait("@quoteAPI").its("response.statusCode").should("eq", 200);
    });
  });
});
