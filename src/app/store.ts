import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "../components/auth/features/authSlice";
import reduxProductsSlice from "../components/auth/reduxProducts/reduxProductsSlices";


export const store = configureStore({
  reducer: {
    reduxProducts: reduxProductsSlice.reducer,
    user: authSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;