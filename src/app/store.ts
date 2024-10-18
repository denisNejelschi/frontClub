import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "../components/auth/features/authSlice";
import reduxActivitiesSlice from "../components/auth/reduxActivities/reduxActivitiesSlice";


export const store = configureStore({
  reducer: {
    reduxActivities: reduxActivitiesSlice.reducer,
    user: authSlice.reducer,
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
