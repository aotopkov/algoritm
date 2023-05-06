import { SHORT_DELAY_IN_MS } from "./../../src/constants/delays";
import { ElementStates } from "../../src/types/element-states";

describe("list page test", () => {
  beforeEach("list page is open", () => {
    cy.visit("http://localhost:3000/list");
  });

  it("check disabled button when input empty", () => {
    cy.get('[data-testId="input"]').should("have.value", "");
    cy.get('[data-testId="btnAddToHead"]').should("have.disabled", "true");
    cy.get('[data-testId="btnAddToTail"]').should("have.disabled", "true");

    cy.get('[data-testId="index"]').should("have.value", 0);
    cy.get('[data-testId="btnAddFromIndex"]').should("have.disabled", "true");
    cy.get('[data-testId="btnDeleteFromIndex"]').should(
      "have.disabled",
      "true"
    );
  });

  it("check init list", () => {
    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li).first().siblings().contains("head");
      cy.get($li).last().siblings().contains("tail");
    });
  });

  it("check add to head", () => {
    cy.get('[data-testId="input"]').type("1");
    cy.get('[data-testId="btnAddToHead"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li).first().contains("1");
      cy.get($li)
        .first()
        .invoke("attr", "class")
        .then((classList) =>
          expect(classList).contains(ElementStates.Changing)
        );
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li).first().siblings().contains("head");
      cy.get($li)
        .first()
        .invoke("attr", "class")
        .then((classList) =>
          expect(classList).contains(ElementStates.Modified)
        );
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li)
        .first()
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(ElementStates.Default));
    });

    cy.get('[data-testId="input"]').should("have.value", "");
  });

  it("check add to tail", () => {
    cy.get('[data-testId="input"]').type("1");
    cy.get('[data-testId="btnAddToTail"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li).last().prev().contains("1");
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li).last().siblings().contains("tail");
      cy.get($li)
        .last()
        .invoke("attr", "class")
        .then((classList) =>
          expect(classList).contains(ElementStates.Modified)
        );
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li)
        .last()
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(ElementStates.Default));
    });

    cy.get('[data-testId="input"]').should("have.value", "");
  });

  it("check remove from head", () => {
    cy.get('[data-testId="btnDeleteFromHead"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li).first().should("have.text", "");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) =>
          expect(classList).contains(ElementStates.Changing)
        );
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li)
        .first()
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(ElementStates.Default));
    });
  });

  it("check remove from tail", () => {
    cy.get('[data-testId="btnDeleteFromTail"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li).last().prev().should("have.text", "");
      cy.get($li)
        .last()
        .invoke("attr", "class")
        .then((classList) =>
          expect(classList).contains(ElementStates.Changing)
        );
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li)
        .last()
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(ElementStates.Default));
    });
  });

  it("check add from index", () => {
    cy.get('[data-testId="input"]').type("1");
    cy.get('[data-testId="index"]').type(1);
    cy.get('[data-testId="btnAddFromIndex"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[1]).prev().contains("1");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) =>
          expect(classList).contains(ElementStates.Changing)
        );
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[1]).contains("1");
    });

    cy.get('[data-testId="input"]').should("have.value", "");
    cy.get('[data-testId="index"]').should("have.value", 0);
  });

  it("check delete from index", () => {
    cy.get('[data-testId="index"]').type(1);
    cy.get('[data-testId="btnDeleteFromIndex"]').click();

    cy.get('[class^="circle_circle"]').then(($li) => {
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) =>
          expect(classList).contains(ElementStates.Changing)
        );
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testId="index"]').should("have.value", 0);
  });
});
