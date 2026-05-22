import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";
import wishlistReducer from "../features/wishlistSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;