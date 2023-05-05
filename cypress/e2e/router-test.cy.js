describe("route test", () => {
  before("site is avaible", () => {
    cy.visit("http://localhost:3000");
  });

  it('site is open', () => {
    cy.contains('МБОУ АЛГОСОШ')
  })
  
  it('string page is avaible', () => {
    cy.visit('http://localhost:3000/recursion');
    cy.contains('Строка')
  })

  it('fibo page is avaible', () => {
    cy.visit('http://localhost:3000/fibonacci')
    cy.contains('Последовательность Фибоначчи')
  })

  it('sort page is avaible', () => {
    cy.visit('http://localhost:3000/sorting')
    cy.contains('Сортировка массива')
  })

  it('stack page is avaible', () => {
    cy.visit('http://localhost:3000/stack')
    cy.contains('Стек')
  })

  it('queue page is avaible', () => {
    cy.visit('http://localhost:3000/queue')
    cy.contains('Очередь')
  })

  it('list page is avaible', () => {
    cy.visit('http://localhost:3000/list')
    cy.contains('Связный список')
  })
});
