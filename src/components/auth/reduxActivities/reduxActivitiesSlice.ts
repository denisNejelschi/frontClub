import { createSlice } from '@reduxjs/toolkit';
import { getActivities, addActivity } from './reduxActivitiesAction';
import { IActivity } from './types';

interface IActivitySlice {
  activities: IActivity[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IActivitySlice = {
  activities: [],
  isLoading: false,
  error: null,
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    cleanActivities: (state) => {
      state.activities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActivities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload;
      })
      .addCase(getActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addActivity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities.push(action.payload);
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default activitiesSlice.reducer;
export const { cleanActivities } = activitiesSlice.actions;