import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const error = useSelector((state) => state.ingredients.error);

  useEffect(() => {
    console.log('ConstructorPage useEffect:', {
      ingredientsLength: ingredients.length,
      isIngredientsLoading,
      error
    });
    // Загружаем ингредиенты при монтировании, если их еще нет
    if (ingredients.length === 0 && !isIngredientsLoading) {
      console.log('Dispatching fetchIngredients...');
      dispatch(fetchIngredients());
    }
  }, [dispatch]);

  if (error) {
    console.error('Error loading ingredients:', error);
  }

  console.log('ConstructorPage render:', {
    isIngredientsLoading,
    ingredientsLength: ingredients.length,
    error
  });

  return (
    <>
      {isIngredientsLoading && !ingredients.length ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
