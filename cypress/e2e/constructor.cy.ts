describe('Проверка конструктора', () => {
  const BUN_NAME = 'Краторная булка N-200i';
  const MODAL = '[data-cy="modal"]';

  beforeEach(() => {
    // Перехватываем все запросы
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

    // Устанавливаем токены в браузер, чтобы приложение считало нас залогиненными
    cy.setCookie('accessToken', 'test-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
  });

  it('полный цикл оформления заказа', () => {
    // 1. Добавляем ингредиент
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    // 2. Кликаем оформить заказ
    cy.get('[data-cy="order-button"]').click();

    // 3. Ждем ответа от сервера
    cy.wait('@postOrder');

    // 4. Проверяем, что модалка открылась и там правильный номер заказа
    cy.get(MODAL).should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '12345');

    // 5. Закрываем модалку
    cy.get('[data-cy="modal-close"]').click();
    cy.get(MODAL).should('not.exist');

    // 6. Проверяем, что конструктор очистился (булки больше нет)
    cy.get('[data-cy="burger-constructor"]').should('not.contain', BUN_NAME);
  });
});