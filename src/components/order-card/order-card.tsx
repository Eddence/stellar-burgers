import { useLocation } from 'react-router-dom';
import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { OrderCardUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';

export const OrderCard: FC<{ order: TOrder }> = ({ order }) => {
  const location = useLocation();
  const allIngredients = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!allIngredients.length) return null;

    const ingredientsInfo = order.ingredients
      .map((id) => allIngredients.find((ing) => ing._id === id))
      .filter((ing): ing is TIngredient => !!ing);

    const total = ingredientsInfo.reduce((acc, ing) => acc + ing.price, 0);

    const maxIngredients = 6;
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date: new Date(order.createdAt)
    };
  }, [order, allIngredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={6}
      locationState={{ background: location }}
    />
  );
};
