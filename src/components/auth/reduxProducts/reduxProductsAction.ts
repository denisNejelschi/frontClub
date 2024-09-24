import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Описание асинхронного действия
export const getProducts = createAsyncThunk(
  'reduxProductsAction',
  async (_, thunkAPI) => {
    try {
      // Запрос данных с использованием axios
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      // Типизация ошибки как AxiosError
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  }
);
