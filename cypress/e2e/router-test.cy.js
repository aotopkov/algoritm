describe("route test", () => {
  before("site is avaible", () => {
    cy.visit("http://localhost:3000");
  });

  it('site is open', () => {
    cy.contains('МБОУ АЛГОСОШ')
  })
  
  it('string page is avaible', () => {
    cy.visit('recursion');
    cy.contains('Строка')
  })

  it('fibo page is avaible', () => {
    cy.visit('fibonacci')
    cy.contains('Последовательность Фибоначчи')
  })

  it('sort page is avaible', () => {
    cy.visit('sorting')
    cy.contains('Сортировка массива')
  })

  it('stack page is avaible', () => {
    cy.visit('stack')
    cy.contains('Стек')
  })

  it('queue page is avaible', () => {
    cy.visit('queue')
    cy.contains('Очередь')
  })

  it('list page is avaible', () => {
    cy.visit('list')
    cy.contains('Связный список')
  })
});
