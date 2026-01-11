import React, { useEffect } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import store, { useDispatch } from './services/store';
import { getUser } from './services/slices/authSlice';
import { getCookie } from './utils/cookie';

// Компонент для проверки авторизации при загрузке приложения
const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверяем, есть ли токен, и если есть - загружаем данные пользователя
    const token = getCookie('accessToken');
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return null;
};

const AppWithAuth = () => (
  <>
    <AuthInitializer />
    <App />
  </>
);

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppWithAuth />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
