import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrders,
  selectUserOrdersFromState
} from '../../services/slices/order/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrdersFromState);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (!orders) return null;

  return <ProfileOrdersUI orders={orders} />;
};
