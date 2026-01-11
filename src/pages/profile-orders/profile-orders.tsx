import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchOrders());
      dispatch({ type: 'orders/connect' });
    }

    return () => {
      // WebSocket закроется автоматически при размонтировании
    };
  }, [dispatch, isAuth]);

  return <ProfileOrdersUI orders={orders} />;
};
