describe('Проверка конструктора', () => {
  const BUN_NAME = 'Краторная булка N-200i';
  const MODAL = '[data-cy="modal"]';

  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('postOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });
    cy.setCookie('accessToken', 'test-token');

    cy.visit('/');
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавить булку в конструктор', () => {
      cy.contains(BUN_NAME).should('be.visible');
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
        .find('button')
        .click();

      cy.contains(`${BUN_NAME} (верх)`).should('be.visible');
      cy.contains(`${BUN_NAME} (низ)`).should('be.visible');
    });

    it('должен добавить начинку в конструктор', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
        .find('button')
        .click();

      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
        .find('button')
        .click();

      cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('должен открыть модальное окно при клике на ингредиент', () => {
      cy.contains(BUN_NAME).click();
      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains(BUN_NAME).should('be.visible');
    });

    it('должен отображать данные конкретного ингредиента в модальном окне', () => {
      cy.contains(BUN_NAME).click();
      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains(BUN_NAME).should('be.visible');
      cy.contains('420').should('be.visible');
      cy.contains('80').should('be.visible');
    });

    it('должен закрыть модальное окно при клике на крестик', () => {
      cy.contains(BUN_NAME).click();
      cy.contains('Детали ингредиента').should('be.visible');

      cy.get('[data-cy="modal-close"]').click();
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('должен закрыть модальное окно при клике на оверлей', () => {
      cy.contains(BUN_NAME).click();
      cy.contains('Детали ингредиента').should('be.visible');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('полный цикл оформления заказа', () => {
      cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
        .find('button')
        .click();

      cy.get('[data-cy="order-button"]').click();

      cy.wait('@postOrder');

      cy.get(MODAL).should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      cy.get('[data-cy="modal-close"]').click();
      cy.get(MODAL).should('not.exist');

      cy.get('[data-cy="burger-constructor"]').should('not.contain', BUN_NAME);
    });
  });
});