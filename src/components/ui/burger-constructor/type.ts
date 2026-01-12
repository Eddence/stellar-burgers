import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TIngredient | TConstructorIngredient | null; // булка может быть не выбрана
    ingredients: TConstructorIngredient[]; // начинки
  };
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
