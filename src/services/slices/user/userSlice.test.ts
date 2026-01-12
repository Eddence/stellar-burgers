import reducer, { loginUser, logoutUser, checkUserAuth } from './userSlice';

describe('Тестирование userSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isAuthenticated: false,
    loginRequest: false,
    error: null
  };

  const mockUser = { email: 'test@ya.ru', name: 'Tester' };

  it('должен обрабатывать loginUser.pending', () => {
    const state = reducer(initialState, { type: loginUser.pending.type });
    expect(state.loginRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = reducer(initialState, action);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен обрабатывать checkUserAuth.fulfilled', () => {
    const action = { type: checkUserAuth.fulfilled.type, payload: mockUser };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен обрабатывать logoutUser.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true
    };
    const state = reducer(loggedInState, { type: logoutUser.fulfilled.type });
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
