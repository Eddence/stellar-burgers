import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsReducer,
  authReducer,
  constructorReducer,
  feedReducer,
  ordersReducer
} from './slices';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  constructor: constructorReducer,
  feed: feedReducer,
  orders: ordersReducer
});
