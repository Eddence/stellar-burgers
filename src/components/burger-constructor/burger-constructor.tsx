import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectConstructorData,
  clearConstructor
} from '../../services/slices/constructor/constructorSlice';
import { selectUser } from '../../services/slices/user/userSlice';
import {
  postOrder,
  clearOrder,
  selectOrderDataFromState,
  selectOrderRequestFromState
} from '../../services/slices/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(selectConstructorData);
  const user = useSelector(selectUser);
  const orderData = useSelector(selectOrderDataFromState);
  const orderRequest = useSelector(selectOrderRequestFromState);

  const onOrderClick = () => {
    // если нет булки или заказ в процессе - ничего не делать
    if (!constructorItems.bun || orderRequest) return;

    // если нет авторизации - отправляем на логин
    if (!user) {
      navigate('/login');
      return;
    }

    // сборка всей id ингредиентов заказа
    const orderIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    // отправка заказа
    dispatch(postOrder(orderIds)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s, v) => s + v.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
