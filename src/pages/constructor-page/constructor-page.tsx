import { useSelector, useDispatch } from '../../services/store';
import { useEffect, FC } from 'react';
import {
  fetchIngredients,
  selectIsIngredientsLoading
} from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { Preloader } from '../../components/ui';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  const isIngredientsLoading = useSelector(selectIsIngredientsLoading);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {isIngredientsLoading ? (
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
