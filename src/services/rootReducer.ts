import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { userSlice } from './slices/user/userSlice';
import { constructorSlice } from './slices/constructor/constructorSlice';
import { feedsSlice } from './slices/feeds/feedsSlice';
import { orderSlice } from './slices/order/orderSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
});
