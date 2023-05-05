import { DELAY_IN_MS } from "./../../src/constants/delays";

describe("string page test", () => {
  beforeEach("string page is open", () => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("check disabled button when input empty", () => {
    cy.get('[data-testId="input"]').should("have.value", "");
    cy.get('[data-testId="reverseBtn"]').should("have.disabled", "true");
  });

  it("check correct work reverse string", () => {
    cy.get('[data-testId="input"]').type("abcd");

    cy.get('[data-testId="reverseBtn"]').click();
    cy.wait(DELAY_IN_MS);
   
    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "a");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
      cy.get($li[1]).children().should("have.text", "b");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("default"));
      cy.get($li[2]).children().should("have.text", "c");
      cy.get($li[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("default"));
      cy.get($li[3]).children().should("have.text", "d");
      cy.get($li[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "d");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("modified"));
      cy.get($li[1]).children().should("have.text", "b");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
      cy.get($li[2]).children().should("have.text", "c");
      cy.get($li[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
      cy.get($li[3]).children().should("have.text", "a");
      cy.get($li[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("modified"));
    });

    cy.wait(DELAY_IN_MS);


    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[0]).children().should("have.text", "d");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("modified"));
      cy.get($li[1]).children().should("have.text", "c");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
      cy.get($li[2]).children().should("have.text", "b");
      cy.get($li[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
      cy.get($li[3]).children().should("have.text", "a");
      cy.get($li[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("modified"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
        cy.get($li[0]).children().should("have.text", "d");
        cy.get($li[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("modified"));
        cy.get($li[1]).children().should("have.text", "c");
        cy.get($li[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("modified"));
        cy.get($li[2]).children().should("have.text", "b");
        cy.get($li[2])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("modified"));
        cy.get($li[3]).children().should("have.text", "a");
        cy.get($li[3])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("modified"));
      });

      cy.get('[data-testId="input"]').should("have.value", "");
      cy.get('[data-testId="reverseBtn"]').should("have.disabled", "true");
  });
});
