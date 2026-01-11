import { FC, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrderByNumber } from '../../services/slices/feedSlice';
import { fetchOrderByNumber as fetchOrderByNumberUser } from '../../services/slices/ordersSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const isProfileOrders = location.pathname.includes('/profile/orders');

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const feedOrder = useSelector((state) => state.feed.currentOrder);
  const userOrder = useSelector((state) => state.orders.currentOrder);
  const orderData = isProfileOrders ? userOrder : feedOrder;

  useEffect(() => {
    if (number) {
      const orderNumber = parseInt(number, 10);
      if (isProfileOrders) {
        dispatch(fetchOrderByNumberUser(orderNumber));
      } else {
        dispatch(fetchOrderByNumber(orderNumber));
      }
    }
  }, [number, isProfileOrders, dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
