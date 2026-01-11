import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients: propsIngredients }, ref) => {
  const bun = useSelector((state) => state.constructor.bun);
  const constructorIngredients = useSelector(
    (state) => state.constructor.ingredients
  );
  const burgerConstructor = { bun, ingredients: constructorIngredients };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    if (ingredients && Array.isArray(ingredients)) {
      ingredients.forEach((ingredient: TIngredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id]++;
      });
    }
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={propsIngredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
