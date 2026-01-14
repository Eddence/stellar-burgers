import {
  ingredientsSlice,
  fetchIngredients
} from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 100,
    image: 'test1.jpg',
    image_large: 'test1-large.jpg',
    image_mobile: 'test1-mobile.jpg'
  }
];

describe('ingredientsSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(ingredientsSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  describe('fetchIngredients', () => {
    it('должен обработать pending экшен', () => {
      const action = fetchIngredients.pending('', undefined, undefined);
      const state = ingredientsSlice.reducer(undefined, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен обработать fulfilled экшен', () => {
      const loadingState = {
        ingredients: [],
        isLoading: true,
        error: null
      };
      const action = fetchIngredients.fulfilled(mockIngredients, '', undefined);
      const state = ingredientsSlice.reducer(loadingState, action);

      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    it('должен обработать rejected экшен', () => {
      const loadingState = {
        ingredients: [],
        isLoading: true,
        error: null
      };
      const errorMessage = 'Failed to fetch';
      const action = fetchIngredients.rejected(
        new Error(errorMessage),
        '',
        undefined,
        undefined
      );
      const state = ingredientsSlice.reducer(loadingState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
