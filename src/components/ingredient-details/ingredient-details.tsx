import { FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { IngredientDetailsUI } from '@ui';
import { Preloader } from '@ui';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const ingredients = useSelector(selectIngredients);

  const ingredientData = ingredients.find((item) => item._id === id);

  // Проверяем, открыто ли это в модальном окне (если есть background location)
  const isModal = location.state?.background;

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      <p
        className='text text_type_main-large mt-10 mb-5'
        style={isModal ? {} : { marginLeft: '100px' }}
      >
        Детали ингредиента
      </p>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </>
  );
};
