import { configureStore } from "@reduxjs/toolkit";

import { Environments } from "@/consts/enum";
import cartReducer from "@/redux/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV === Environments.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
