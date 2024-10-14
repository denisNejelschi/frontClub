import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ITokenDto, IUser, IUserData } from './authSlice';
import { ILoginFormValues } from '../Login';

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
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.message); 
        console.error('Response data:', error.response?.data);
        return thunkAPI.rejectWithValue(error.response?.data || error.message); 
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);



export const getUserWithToken = createAsyncThunk<
  IUser,
  void
>(
  'auth/me',
  async () => {
    // try {
      const token = localStorage.getItem('token');
      const response: AxiosResponse<IUser> = await axios.get('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    // } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   return thunkAPI.rejectWithValue(error.message);
      // }
      // return thunkAPI.rejectWithValue('An unexpected error occurred');
    // }
  }
);

export const registerUser = createAsyncThunk<
  IUserData, 
  { username: string; password: string; email: string }, 
  { rejectValue: string }
>(
  'auth/register', 
  async (data, thunkAPI) => {
    try {
      const response: AxiosResponse<IUserData> = await axios.post('/api/register', data);
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error message:', error.message);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);

export const resetPassword = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>(
  'auth/resetPassword',
  async ({ email }, thunkAPI) => {
    try {
      await axios.post('http://localhost:8080/user/reset-password', { email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);
