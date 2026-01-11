import { Middleware } from '@reduxjs/toolkit';
import { setFeeds } from '../slices/feedSlice';
import { setOrders } from '../slices/ordersSlice';
import { TOrder } from '@utils-types';

const URL = process.env.BURGER_API_URL || '';

type TWsMessage = {
  success: boolean;
  orders?: TOrder[];
  total?: number;
  totalToday?: number;
};

export const createWsMiddleware = (): Middleware => {
  let feedWs: WebSocket | null = null;
  let ordersWs: WebSocket | null = null;

  return (store) => (next) => (action) => {
    const result = next(action);

    // Подключаемся к WebSocket для ленты заказов
    if (
      (action as { type: string }).type === 'feed/connect' ||
      ((action as { type: string }).type === 'auth/login/fulfilled' && !feedWs)
    ) {
      if (feedWs) {
        feedWs.close();
      }

      const wsUrl =
        URL.replace(/^https?/, (match) => (match === 'https' ? 'wss' : 'ws')) +
        '/orders/all';
      feedWs = new WebSocket(wsUrl);

      feedWs.onmessage = (event) => {
        try {
          const data: TWsMessage = JSON.parse(event.data);
          if (data.success && data.orders) {
            store.dispatch(
              setFeeds({
                orders: data.orders,
                total: data.total || 0,
                totalToday: data.totalToday || 0
              })
            );
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      feedWs.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      feedWs.onclose = () => {
        feedWs = null;
      };
    }

    // Подключаемся к WebSocket для заказов пользователя
    if (
      ((action as { type: string }).type === 'orders/connect' ||
        (action as { type: string }).type === 'auth/login/fulfilled') &&
      !ordersWs &&
      store.getState().auth.isAuth
    ) {
      // ordersWs уже null из-за проверки !ordersWs выше, поэтому закрывать нечего

      const token = store.getState().auth.user
        ? document.cookie
            .split('; ')
            .find((row) => row.startsWith('accessToken='))
            ?.split('=')[1]
        : null;

      if (token) {
        const wsUrl =
          URL.replace(/^https?/, (match) =>
            match === 'https' ? 'wss' : 'ws'
          ) + `/orders?token=${token}`;
        ordersWs = new WebSocket(wsUrl);

        ordersWs.onmessage = (event) => {
          try {
            const data: TWsMessage = JSON.parse(event.data);
            if (data.success && data.orders) {
              store.dispatch(setOrders(data.orders));
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ordersWs.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        ordersWs.onclose = () => {
          ordersWs = null;
        };
      }
    }

    // Отключаемся при выходе
    if ((action as { type: string }).type === 'auth/logout/fulfilled') {
      if (feedWs) {
        feedWs.close();
        feedWs = null;
      }
      if (ordersWs) {
        ordersWs.close();
        ordersWs = null;
      }
    }

    return result;
  };
};
