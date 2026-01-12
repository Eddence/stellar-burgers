import reducer, { postOrder, fetchUserOrders, clearOrder } from './orderSlice';

describe('Тестирование orderSlice', () => {
  const initialState = {
    userOrders: [],
    orderData: null,
    orderRequest: false,
    error: null
  };

  it('должен очищать orderData при clearOrder', () => {
    const stateWithData = { ...initialState, orderData: { number: 1 } as any };
    const state = reducer(stateWithData, clearOrder());
    expect(state.orderData).toBeNull();
  });

  it('должен менять состояние при postOrder.pending', () => {
    const state = reducer(initialState, { type: postOrder.pending.type });
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять заказ при postOrder.fulfilled', () => {
    const mockPayload = { order: { number: 555 } };
    const action = { type: postOrder.fulfilled.type, payload: mockPayload };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderData?.number).toBe(555);
  });

  it('должен загружать список заказов пользователя при fetchUserOrders.fulfilled', () => {
    const mockOrders = [{ number: 1 }, { number: 2 }];
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer(initialState, action);
    expect(state.userOrders).toHaveLength(2);
    expect(state.orderRequest).toBe(false);
  });
});
