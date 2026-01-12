import { rootReducer } from './rootReducer';
import { Action } from 'redux';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { userSlice } from './slices/user/userSlice';
import { constructorSlice } from './slices/constructor/constructorSlice';
import { feedsSlice } from './slices/feeds/feedsSlice';

describe('Тестирование rootReducer', () => {
  it('должен инициализировать стейт с правильными начальными значениями при экшене unknown', () => {
    const initialState = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    } as Action);

    // Используем динамические имена из самих слайсов
    expect(initialState).toHaveProperty(ingredientsSlice.name);
    expect(initialState).toHaveProperty(userSlice.name);
    expect(initialState).toHaveProperty(constructorSlice.name);
    expect(initialState).toHaveProperty(feedsSlice.name);
  });
});
