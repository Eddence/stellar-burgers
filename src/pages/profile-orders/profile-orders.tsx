import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrders,
  selectUserOrdersFromState,
  selectOrderRequest
} from '../../services/slices/order/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrdersFromState);
  const orderRequest = useSelector(selectOrderRequest);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (orderRequest || !orders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
