import { DELAY_IN_MS } from "./../../src/constants/delays";
import { buttonAdd, buttonClear, buttonRemove, circle, input } from "./constant";

describe("stack page test", () => {
  beforeEach("string page is open", () => {
    cy.visit("stack");
  });

  it("check disabled button when input empty", () => {
    cy.get(input).should("have.value", "");
    cy.get(buttonAdd).should("have.disabled", "true");
  });

  it("check add to stack", () => {
    cy.get(input).type("1");
    cy.get(buttonAdd).click();

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0]).siblings().contains("TOP");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("default"));
    });

    cy.get(input).type("2");
    cy.get(buttonAdd).click();

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1]).siblings().contains("TOP");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("default"));
    });

    cy.get(input).type("3");
    cy.get(buttonAdd).click();

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[2]).children().should("have.text", "3");
      cy.get($li[2]).siblings().contains("TOP");
      cy.get($li[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[2]).children().should("have.text", "3");
      cy.get($li[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("default"));
    });
  });

  it("check delete from stack", () => {
    cy.get(input).type("1");
    cy.get(buttonAdd).click();
    cy.wait(DELAY_IN_MS);
    cy.get(input).type("2");
    cy.get(buttonAdd).click();
    cy.wait(DELAY_IN_MS);
    cy.get(input).type("3");
    cy.get(buttonAdd).click();
    cy.wait(DELAY_IN_MS);

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[2]).children().should("have.text", "3");
      cy.get($li[2]).siblings().contains("TOP");
    });

    cy.get(buttonRemove).click();

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[2]).children().should("have.text", "3");
      cy.get($li[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1]).siblings().contains("TOP");
    });

    cy.get(buttonRemove).click();

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0]).siblings().contains("TOP");
    });

    cy.get(buttonRemove).click();

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("changing"));
    });

    cy.wait(DELAY_IN_MS);

    cy.get(buttonRemove).should("have.disabled", "true");
  });

  it("check clear stack", () => {
    cy.get(input).type("1");
    cy.get(buttonAdd).click();
    cy.wait(DELAY_IN_MS);
    cy.get(input).type("2");
    cy.get(buttonAdd).click();
    cy.wait(DELAY_IN_MS);
    cy.get(input).type("3");
    cy.get(buttonAdd).click();
    cy.wait(DELAY_IN_MS);

    cy.get(circle).then(($li) => {
      cy.get($li[0]).children().should("have.text", "1");
      cy.get($li[1]).children().should("have.text", "2");
      cy.get($li[2]).children().should("have.text", "3");
      cy.get($li[2]).siblings().contains("TOP");
    });

    cy.get(buttonClear).click();

    cy.wait(DELAY_IN_MS);

    cy.get(buttonRemove).should("have.disabled", "true");
    cy.get(buttonClear).should("have.disabled", "true");
  });
});
