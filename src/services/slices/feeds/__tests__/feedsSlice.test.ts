import { feedsSlice, fetchFeeds } from '../feedsSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order1',
    status: 'done',
    name: 'Test Order 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['ing1', 'ing2']
  }
];

const mockFeedsData = {
  success: true,
  orders: mockOrders,
  total: 100,
  totalToday: 5
};

describe('feedsSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(feedsSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null
    });
  });

  describe('fetchFeeds', () => {
    it('должен обработать pending экшен', () => {
      const action = fetchFeeds.pending('', undefined, undefined);
      const state = feedsSlice.reducer(undefined, action);

      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });

    it('должен обработать fulfilled экшен', () => {
      const action = fetchFeeds.fulfilled(mockFeedsData, '', undefined);
      const state = feedsSlice.reducer(undefined, action);

      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(5);
    });

    it('должен обработать rejected экшен', () => {
      const errorMessage = 'Failed to fetch feeds';
      const action = fetchFeeds.rejected(
        new Error(errorMessage),
        '',
        undefined,
        undefined
      );
      const state = feedsSlice.reducer(undefined, action);

      expect(state.orders).toEqual([]);
      expect(state.error).toBeNull();
    });
  });
});
