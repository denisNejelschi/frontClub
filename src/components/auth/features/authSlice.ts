import { createSlice } from '@reduxjs/toolkit';
import { getUserWithToken, loginUser } from './authAction';

export interface IUserData {
  id: number;
  username: string;
  email: string;
  refreshToken: string;
  token: string;
}

export interface ITokenDto {
  refreshToken: string;
  accessToken: string;
}

interface IUserState {
  user: IUserData;
  isLoading: boolean;
  error: string;
  isAuthenticated: boolean;
}

const initialUser: IUserData = {
  id: 0,
  username: '',
  email: '',
  refreshToken: '',
  token: '',
};

const initialState: IUserState = {
  user: initialUser,
  isLoading: false,
  error: '',
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = initialUser;
      state.isAuthenticated = false;
      state.error = ''; // Сброс ошибки при выходе
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = ''; 
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(getUserWithToken.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getUserWithToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserWithToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser; 
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice;
export const { logoutUser } = authSlice.actions;
