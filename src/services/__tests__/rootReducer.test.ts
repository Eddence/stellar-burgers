import { rootReducer } from '../rootReducer';

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние при вызове с undefined и UNKNOWN_ACTION', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feeds');
    expect(state).toHaveProperty('order');

    expect(state.ingredients).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      isAuthenticated: false,
      loginRequest: false,
      error: null
    });

    expect(state.feeds).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    });

    expect(state.order).toEqual({
      userOrders: [],
      orderData: null,
      orderRequest: false,
      error: null
    });
  });
});
