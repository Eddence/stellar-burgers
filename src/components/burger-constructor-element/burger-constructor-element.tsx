import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/constructor/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredientUp(index));
    };

    const handleMoveDown = () => {
      dispatch(moveIngredientDown(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleClose={handleClose}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
      />
    );
  }
);
