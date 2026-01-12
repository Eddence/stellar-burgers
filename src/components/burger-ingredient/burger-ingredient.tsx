import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient } from '../../services/slices/constructor/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const constructorItems = useSelector((state) => state.burgerConstructor);

    const count = useMemo(() => {
      if (ingredient.type === 'bun') {
        return constructorItems.bun?._id === ingredient._id ? 1 : 0;
      }
      return constructorItems.ingredients.filter(
        (item) => item._id === ingredient._id
      ).length;
    }, [constructorItems, ingredient]);

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count > 0 ? count : undefined}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
