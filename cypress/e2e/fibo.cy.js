import { SHORT_DELAY_IN_MS } from "./../../src/constants/delays";

describe("fibonacci page test", () => {
  beforeEach("string page is open", () => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("check disabled button when input empty", () => {
    cy.get('[data-testId="input"]').should("have.value", 0);
    cy.get('[data-testId="button"]').should("have.disabled", "true");
  });

  it("check correct work", () => {
    cy.get('[data-testId="input"]').type(5);

    cy.get('[data-testId="button"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", 1);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", 1);
      cy.get($li[1]).children().should("have.text", 1);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", 1);
      cy.get($li[1]).children().should("have.text", 1);
      cy.get($li[2]).children().should("have.text", 2);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", 1);
      cy.get($li[1]).children().should("have.text", 1);
      cy.get($li[2]).children().should("have.text", 2);
      cy.get($li[3]).children().should("have.text", 3);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", 1);
      cy.get($li[1]).children().should("have.text", 1);
      cy.get($li[2]).children().should("have.text", 2);
      cy.get($li[3]).children().should("have.text", 3);
      cy.get($li[4]).children().should("have.text", 5);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", 1);
      cy.get($li[1]).children().should("have.text", 1);
      cy.get($li[2]).children().should("have.text", 2);
      cy.get($li[3]).children().should("have.text", 3);
      cy.get($li[4]).children().should("have.text", 5);
      cy.get($li[5]).children().should("have.text", 8);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testId="input"]').should("have.value", 0);
    cy.get('[data-testId="button"]').should("have.disabled", "true");
  });
});
