import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse} from 'axios';
import { IFormValues, IUserData } from '../Auth';


export const loginUser = createAsyncThunk<
  IUserData, 
  IFormValues, 
  { rejectValue: string } 
>(
  'authAction',
  async (data, thunkAPI) => {
    try {
      const response: AxiosResponse<IUserData> = await axios.post('https://dummyjson.com/user/login', data);
      localStorage.setItem("shop-token", response.data.token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getUserWithToken = createAsyncThunk<
  IUserData,
  string,
  { rejectValue: string }
>(
  'loginToken',
  async (token, thunkAPI) => {
    try {
      const response: AxiosResponse<IUserData> = await axios.get('https://dummyjson.com/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);

export const registerUser = createAsyncThunk<
  IUserData,  // Возвращаемый тип
  { username: string; password: string; email: string }, // Тип входных данных
  { rejectValue: string } // Тип для обработки ошибок
>(
  'auth/register', // Уникальный ключ действия
  async (data, thunkAPI) => {
    try {
      const response: AxiosResponse<IUserData> = await axios.post('https://dummyjson.com/user/register', data);
      localStorage.setItem("shop-token", response.data.token); // Сохраните токен, если нужно
      return response.data; // Возвращаем данные пользователя
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
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
      await axios.post('https://dummyjson.com/user/reset-password', { email });
      // Можно добавить логику для уведомления о том, что письмо отправлено
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unexpected error occurred');
    }
  }
);

