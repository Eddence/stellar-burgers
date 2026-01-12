import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from './constructorSlice';

describe('Тестирование constructorSlice', () => {
  const mockBun = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    price: 100,
    image: ''
  };

  const mockIngredient = {
    _id: '2',
    name: 'Начинка',
    type: 'main',
    price: 200,
    image: ''
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  it('должен добавлять булку через addIngredient (используя prepare)', () => {
    const action = addIngredient(mockBun as any);
    const state = reducer(initialState, action);

    expect(state.bun).toEqual(expect.objectContaining(mockBun));
    expect(state.bun).toHaveProperty('id'); // Проверяем работу uuidv4
  });

  it('должен удалять ингредиент по id', () => {
    const stateWithItem = {
      bun: null,
      ingredients: [{ ...mockIngredient, id: 'test-uuid-123' } as any]
    };

    const state = reducer(stateWithItem, removeIngredient('test-uuid-123'));
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен перемещать ингредиент вверх', () => {
    const stateWithItems = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: '1', name: 'Первый' },
        { ...mockIngredient, id: '2', name: 'Второй' }
      ] as any
    };

    const state = reducer(stateWithItems, moveIngredientUp(1));
    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });

  it('должен очищать конструктор', () => {
    const dirtyState = {
      bun: mockBun as any,
      ingredients: [mockIngredient] as any
    };

    const state = reducer(dirtyState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
