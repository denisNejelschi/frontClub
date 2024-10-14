import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ITokenDto, IUser, IUserData } from './authSlice';
import { ILoginFormValues } from '../Login';

// Remove the local declaration of ITokenDto

// Логин пользователя
export const loginUser = createAsyncThunk<
  ITokenDto, 
  ILoginFormValues, 
  { rejectValue: string }
>(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response: AxiosResponse<ITokenDto> = await axios.post('/api/auth/login', {
        username,
        password,
      }, {
        withCredentials: true 
      });
      localStorage.setItem('token', response.data.accessToken);
      console.log('Saved token:', localStorage.getItem('token'));
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error during login:', error.message); 
        console.error('Response data:', error.response?.data);
        return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred during login');
    }
  }
);

// Получение пользователя по токену
export const getUserWithToken = createAsyncThunk<
IUser,
void,
{ rejectValue: string }
>(
'auth/me',
async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return thunkAPI.rejectWithValue('Token not found');
  }

  try {
    const response: AxiosResponse<IUser> = await axios.get('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('User fetched:', response.data, "token: ", token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error during fetching user:', error.message);
        return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user');
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred while fetching user');
    }
  }
);

// Регистрация пользователя
export const registerUser = createAsyncThunk<
  IUserData, 
  { username: string; password: string; email: string }, 
  { rejectValue: string }
>(
  'auth/register', 
  async (data, thunkAPI) => {
    try {
      const response: AxiosResponse<IUserData> = await axios.post('/api/register', data);
      console.log('User registered:', response.data);
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error during registration:', error.message);
        return thunkAPI.rejectWithValue(error.response?.data || 'Registration failed');
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred during registration');
    }
  }
);

// Сброс пароля
export const resetPassword = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>(
  'auth/resetPassword',
  async ({ email }, thunkAPI) => {
    try {
      await axios.post('/api/user/reset-password', { email });
      console.log('Password reset request sent');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error during password reset:', error.message);
        return thunkAPI.rejectWithValue(error.message || 'Password reset failed');
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred during password reset');
    }
  }
);
