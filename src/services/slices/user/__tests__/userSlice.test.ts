import {
  userSlice,
  registerUser,
  loginUser,
  updateUser,
  checkUserAuth,
  logoutUser
} from '../userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('userSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      isAuthChecked: false,
      isAuthenticated: false,
      loginRequest: false,
      error: null
    });
  });

  describe('loginUser', () => {
    it('должен обработать pending экшен', () => {
      const action = loginUser.pending(
        '',
        { email: 'test@example.com', password: 'password' },
        undefined
      );
      const state = userSlice.reducer(undefined, action);

      expect(state.loginRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обработать fulfilled экшен', () => {
      const loadingState = {
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        loginRequest: true,
        error: null
      };
      const action = loginUser.fulfilled(
        mockUser,
        '',
        { email: 'test@example.com', password: 'password' }
      );
      const state = userSlice.reducer(loadingState, action);

      expect(state.loginRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен обработать rejected экшен', () => {
      const loadingState = {
        user: null,
        isAuthChecked: false,
        isAuthenticated: false,
        loginRequest: true,
        error: null
      };
      const errorMessage = 'Login failed';
      const action = loginUser.rejected(
        new Error(errorMessage),
        '',
        { email: 'test@example.com', password: 'password' },
        undefined
      );
      const state = userSlice.reducer(loadingState, action);

      expect(state.loginRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('registerUser', () => {
    it('должен обработать pending экшен', () => {
      const action = registerUser.pending(
        '',
        { email: 'test@example.com', name: 'Test', password: 'password' },
        undefined
      );
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toBeNull();
    });

    it('должен обработать fulfilled экшен', () => {
      const action = registerUser.fulfilled(
        mockUser,
        '',
        { email: 'test@example.com', name: 'Test', password: 'password' }
      );
      const state = userSlice.reducer(undefined, action);

      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен обработать rejected экшен', () => {
      const errorMessage = 'Registration failed';
      const action = registerUser.rejected(
        new Error(errorMessage),
        '',
        { email: 'test@example.com', name: 'Test', password: 'password' },
        undefined
      );
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('должен обработать pending экшен', () => {
      const action = updateUser.pending('', { name: 'Updated Name' }, undefined);
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toBeNull();
    });

    it('должен обработать fulfilled экшен', () => {
      const stateWithUser = {
        user: mockUser,
        isAuthChecked: true,
        isAuthenticated: true,
        loginRequest: false,
        error: null
      };
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      const action = updateUser.fulfilled(updatedUser, '', { name: 'Updated Name' });
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.user).toEqual(updatedUser);
    });

    it('должен обработать rejected экшен', () => {
      const stateWithUser = {
        user: mockUser,
        isAuthChecked: true,
        isAuthenticated: true,
        loginRequest: false,
        error: null
      };
      const errorMessage = 'Failed to update user';
      const action = updateUser.rejected(
        new Error(errorMessage),
        '',
        { name: 'Updated Name' },
        undefined
      );
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.user).toEqual(mockUser);
    });
  });

  describe('checkUserAuth', () => {
    it('должен обработать pending экшен', () => {
      const action = checkUserAuth.pending('', undefined, undefined);
      const state = userSlice.reducer(undefined, action);

      expect(state.isAuthChecked).toBe(false);
    });

    it('должен обработать fulfilled экшен', () => {
      const action = checkUserAuth.fulfilled(mockUser, '', undefined);
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен обработать rejected экшен', () => {
      const action = checkUserAuth.rejected(
        new Error('Unauthorized'),
        '',
        undefined,
        undefined
      );
      const state = userSlice.reducer(undefined, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe('logoutUser', () => {
    it('должен обработать pending экшен', () => {
      const action = logoutUser.pending('', undefined, undefined);
      const state = userSlice.reducer(undefined, action);

      expect(state.user).toBeNull();
    });

    it('должен обработать fulfilled экшен', () => {
      const stateWithUser = {
        user: mockUser,
        isAuthChecked: true,
        isAuthenticated: true,
        loginRequest: false,
        error: null
      };
      const action = logoutUser.fulfilled(undefined, '', undefined);
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it('должен обработать rejected экшен', () => {
      const stateWithUser = {
        user: mockUser,
        isAuthChecked: true,
        isAuthenticated: true,
        loginRequest: false,
        error: null
      };
      const errorMessage = 'Logout failed';
      const action = logoutUser.rejected(
        new Error(errorMessage),
        '',
        undefined,
        undefined
      );
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.user).toEqual(mockUser);
    });
  });
});
