import {
  orderSlice,
  postOrder,
  fetchUserOrders,
  fetchOrderByNumber
} from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ing1', 'ing2']
};

describe('orderSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(orderSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      userOrders: [],
      orderData: null,
      orderRequest: false,
      error: null
    });
  });

  describe('postOrder', () => {
    it('должен обработать pending экшен', () => {
      const action = postOrder.pending('', ['ing1'], undefined);
      const state = orderSlice.reducer(undefined, action);

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обработать fulfilled экшен', () => {
      const loadingState = {
        userOrders: [],
        orderData: null,
        orderRequest: true,
        error: null
      };
      const action = postOrder.fulfilled(
        { success: true, order: mockOrder },
        '',
        ['ing1']
      );
      const state = orderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderData).toEqual(mockOrder);
    });

    it('должен обработать rejected экшен', () => {
      const loadingState = {
        userOrders: [],
        orderData: null,
        orderRequest: true,
        error: null
      };
      const errorMessage = 'Failed to create order';
      const action = postOrder.rejected(
        new Error(errorMessage),
        '',
        ['ing1'],
        undefined
      );
      const state = orderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('fetchUserOrders', () => {
    it('должен обработать pending экшен', () => {
      const action = fetchUserOrders.pending('', undefined, undefined);
      const state = orderSlice.reducer(undefined, action);

      expect(state.orderRequest).toBe(true);
    });

    it('должен обработать fulfilled экшен', () => {
      const loadingState = {
        userOrders: [],
        orderData: null,
        orderRequest: true,
        error: null
      };
      const action = fetchUserOrders.fulfilled([mockOrder], '', undefined);
      const state = orderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.userOrders).toEqual([mockOrder]);
    });

    it('должен обработать rejected экшен', () => {
      const loadingState = {
        userOrders: [],
        orderData: null,
        orderRequest: true,
        error: null
      };
      const errorMessage = 'Failed to fetch orders';
      const action = fetchUserOrders.rejected(
        new Error(errorMessage),
        '',
        undefined,
        undefined
      );
      const state = orderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('fetchOrderByNumber', () => {
    it('должен обработать pending экшен', () => {
      const action = fetchOrderByNumber.pending('', 12345, undefined);
      const state = orderSlice.reducer(undefined, action);

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обработать fulfilled экшен', () => {
      const loadingState = {
        userOrders: [],
        orderData: null,
        orderRequest: true,
        error: null
      };
      const action = fetchOrderByNumber.fulfilled(
        { success: true, orders: [mockOrder] },
        '',
        12345
      );
      const state = orderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderData).toEqual(mockOrder);
    });

    it('должен обработать rejected экшен', () => {
      const loadingState = {
        userOrders: [],
        orderData: null,
        orderRequest: true,
        error: null
      };
      const errorMessage = 'Order not found';
      const action = fetchOrderByNumber.rejected(
        new Error(errorMessage),
        '',
        12345,
        undefined
      );
      const state = orderSlice.reducer(loadingState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
