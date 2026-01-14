import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../constructorSlice';
import { TIngredient } from '@utils-types';

const testBun: TIngredient = {
  _id: 'bun-1',
  name: 'Test Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 100,
  image: 'bun.jpg',
  image_large: 'bun-large.jpg',
  image_mobile: 'bun-mobile.jpg'
};

const testIngredient: TIngredient = {
  _id: 'ing-1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 20,
  fat: 10,
  carbohydrates: 30,
  calories: 200,
  price: 200,
  image: 'ing.jpg',
  image_large: 'ing-large.jpg',
  image_mobile: 'ing-mobile.jpg'
};

describe('constructorSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(constructorSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  describe('addIngredient', () => {
    it('должен добавить булку в конструктор', () => {
      const action = addIngredient(testBun);
      const state = constructorSlice.reducer(undefined, action);

      expect(state.bun).toMatchObject(testBun);
      expect(state.bun).toHaveProperty('id');
      expect(state.ingredients).toHaveLength(0);
    });

    it('должен добавить ингредиент в список', () => {
      const action = addIngredient(testIngredient);
      const state = constructorSlice.reducer(undefined, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject(testIngredient);
      expect(state.ingredients[0]).toHaveProperty('id');
    });

    it('должен заменить существующую булку', () => {
      const firstState = constructorSlice.reducer(
        undefined,
        addIngredient(testBun)
      );
      const newBun: TIngredient = { ...testBun, _id: 'bun-2', name: 'New Bun' };
      const state = constructorSlice.reducer(firstState, addIngredient(newBun));

      expect(state.bun?._id).toBe('bun-2');
      expect(state.bun?.name).toBe('New Bun');
    });
  });

  describe('removeIngredient', () => {
    it('должен удалить ингредиент по id', () => {
      let state = constructorSlice.reducer(undefined, addIngredient(testIngredient));
      const ingredientId = state.ingredients[0].id;

      state = constructorSlice.reducer(state, removeIngredient(ingredientId));

      expect(state.ingredients).toHaveLength(0);
    });

    it('не должен удалить ингредиент, если id не существует', () => {
      let state = constructorSlice.reducer(undefined, addIngredient(testIngredient));
      const initialLength = state.ingredients.length;

      state = constructorSlice.reducer(state, removeIngredient('non-existent-id'));

      expect(state.ingredients).toHaveLength(initialLength);
    });
  });

  describe('moveIngredientUp и moveIngredientDown', () => {
    const testIngredient2: TIngredient = {
      _id: 'ing-2',
      name: 'Test Ingredient 2',
      type: 'main',
      proteins: 15,
      fat: 8,
      carbohydrates: 25,
      calories: 150,
      price: 150,
      image: 'ing2.jpg',
      image_large: 'ing2-large.jpg',
      image_mobile: 'ing2-mobile.jpg'
    };

    it('должен переместить ингредиент вверх', () => {
      let state = constructorSlice.reducer(undefined, addIngredient(testIngredient));
      state = constructorSlice.reducer(state, addIngredient(testIngredient2));

      const firstId = state.ingredients[0].id;
      const secondId = state.ingredients[1].id;

      // Перемещаем второй ингредиент вверх
      state = constructorSlice.reducer(state, moveIngredientUp(1));

      expect(state.ingredients[0].id).toBe(secondId);
      expect(state.ingredients[1].id).toBe(firstId);
    });

    it('должен переместить ингредиент вниз', () => {
      let state = constructorSlice.reducer(undefined, addIngredient(testIngredient));
      state = constructorSlice.reducer(state, addIngredient(testIngredient2));

      const firstId = state.ingredients[0].id;
      const secondId = state.ingredients[1].id;

      // Перемещаем первый ингредиент вниз
      state = constructorSlice.reducer(state, moveIngredientDown(0));

      expect(state.ingredients[0].id).toBe(secondId);
      expect(state.ingredients[1].id).toBe(firstId);
    });

    it('не должен переместить ингредиент вверх, если он первый', () => {
      let state = constructorSlice.reducer(undefined, addIngredient(testIngredient));
      state = constructorSlice.reducer(state, addIngredient(testIngredient2));

      const originalOrder = state.ingredients.map((ing) => ing.id);

      // Пытаемся переместить первый ингредиент вверх
      state = constructorSlice.reducer(state, moveIngredientUp(0));

      expect(state.ingredients.map((ing) => ing.id)).toEqual(originalOrder);
    });

    it('не должен переместить ингредиент вниз, если он последний', () => {
      let state = constructorSlice.reducer(undefined, addIngredient(testIngredient));
      state = constructorSlice.reducer(state, addIngredient(testIngredient2));

      const originalOrder = state.ingredients.map((ing) => ing.id);

      // Пытаемся переместить последний ингредиент вниз
      state = constructorSlice.reducer(state, moveIngredientDown(1));

      expect(state.ingredients.map((ing) => ing.id)).toEqual(originalOrder);
    });
  });

  describe('clearConstructor', () => {
    it('должен очистить все ингредиенты и булку', () => {
      let state = constructorSlice.reducer(undefined, addIngredient(testBun));
      state = constructorSlice.reducer(state, addIngredient(testIngredient));

      state = constructorSlice.reducer(state, clearConstructor());

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
