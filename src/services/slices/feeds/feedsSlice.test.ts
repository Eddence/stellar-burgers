import reducer, { fetchFeeds } from './feedsSlice';

describe('Тестирование feedsSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
  };

  it('должен обновлять данные ленты при fulfilled', () => {
    const mockPayload = {
      orders: [{ _id: '1', number: 123 }],
      total: 1000,
      totalToday: 10
    };
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: mockPayload
    };
    const state = reducer(initialState, action);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(1000);
    expect(state.totalToday).toBe(10);
  });
});
