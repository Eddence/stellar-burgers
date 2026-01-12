import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import {
  fetchOrderByNumber,
  selectOrderDataFromState,
  selectUserOrdersFromState
} from '../../services/slices/order/orderSlice';
import { selectFeedsOrders } from '../../services/slices/feeds/feedsSlice';
import { TIngredient } from '@utils-types';
import { OrderInfoUI } from '../ui/order-info';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);

  const userOrders = useSelector(selectUserOrdersFromState);
  const feedsOrders = useSelector(selectFeedsOrders);
  const fetchedOrder = useSelector(selectOrderDataFromState);

  const orderData = useMemo(() => {
    const num = Number(number);
    return (
      userOrders.find((o) => o.number === num) ||
      feedsOrders.find((o) => o.number === num) ||
      (fetchedOrder?.number === num ? fetchedOrder : null)
    );
  }, [number, userOrders, feedsOrders, fetchedOrder]);

  useEffect(() => {
    if (!orderData && number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, orderData, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          const _id = ingredient._id;
          if (acc[_id]) {
            acc[_id].count++;
          } else {
            acc[_id] = { ...ingredient, count: 1 };
          }
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

  if (!orderInfo) return null;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
