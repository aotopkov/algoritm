import { DELAY_IN_MS } from "./../../src/constants/delays";

describe("queue page test", () => {
  beforeEach("string page is open", () => {
    cy.visit("http://localhost:3000/queue");
  });

  it("check disabled button when input empty", () => {
    cy.get('[data-testId="input"]').should("have.value", "");
    cy.get('[data-testId="buttonAdd"]').should("have.disabled", "true");
  });

  it("check add to queue", () => {
    cy.get('[data-testId="input"]').type("1");
    cy.get('[data-testId="buttonAdd"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0]).siblings().contains("head");
      cy.get($li[0]).siblings().contains("tail");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("default"));
    });

    cy.get('[data-testId="input"]').type("2");
    cy.get('[data-testId="buttonAdd"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0]).siblings().contains("head");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1]).siblings().contains("tail");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("default"));
    });
  });

  it("check remove from queue", () => {
    cy.get('[data-testId="input"]').type("1");
    cy.get('[data-testId="buttonAdd"]').click();
    cy.wait(DELAY_IN_MS);
    cy.get('[data-testId="input"]').type("2");
    cy.get('[data-testId="buttonAdd"]').click();
    cy.wait(DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0]).siblings().contains("head");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1]).siblings().contains("tail");
    });

    cy.get('[data-testId="buttonRemove"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[1]).siblings().contains("head");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1]).siblings().contains("tail");
    });

    cy.get('[data-testId="buttonRemove"]').should("have.disabled", "true");
  });

  it("check clear queue", () => {
    cy.get('[data-testId="input"]').type("1");
    cy.get('[data-testId="buttonAdd"]').click();
    cy.wait(DELAY_IN_MS);
    cy.get('[data-testId="input"]').type("2");
    cy.get('[data-testId="buttonAdd"]').click();
    cy.wait(DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0]).siblings().contains("head");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1]).siblings().contains("tail");
    });

    cy.get('[data-testId="buttonClear"]').click();
    cy.get('[data-testId="buttonRemove"]').should("have.disabled", "true");
    cy.get('[data-testId="buttonClear"]').should("have.disabled", "true");
  });
});
