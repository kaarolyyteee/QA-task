describe("Spectrocon currency", () => {
    context("desktop resolution", () => {
      beforeEach(() => {
        cy.viewport(1440, 1080);
      });
  
      it("should be positive between last 24 hours", () => {
        cy.visit("https://spectrocoin.com/en/bitcoin-price-rates.html");
  
        cy.get("#currency-select").click().contains("GBP").click();
  
        cy.get("[data-cy=rates] >thead >tr")
          .contains("th", "Last 24 hours")
          .invoke("index")
          .then((colIndex) => {
            cy.get(
              `[data-cy=rates] >tbody >tr >td:nth-child(${colIndex + 1})`
            ).each(($el) => {
              const number = parseFloat($el.text().match(/\-?\d+\.\d+/)[0]);
  
              expect(number).to.be.above(0);
            });
          });
      });
    });
});