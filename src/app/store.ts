import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "../components/features/auth/authSlice";
import reduxActivitiesSlice from "../components/reduxActivities/reduxActivitiesSlice";
import adminReducer from '../components/adminPanel/adminSlice';


export const store = configureStore({
  reducer: {
    admin: adminReducer,
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
export default store;
