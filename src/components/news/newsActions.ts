/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Определите интерфейс для новостей
export interface INews {
  id: number;
  title: string;
  summary: string;
  image?: string; // Необязательное поле для изображения
  url: string; // Ссылка на полную статью
}

// Создание новости
export const createNews = createAsyncThunk<INews, INews>(
  "news/createNews",
  async (newsData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<INews>("/api/news", newsData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create news");
    }
  }
);

// Удаление новости
export const deleteNews = createAsyncThunk<INews, number>(
  "news/deleteNews",
  async (_newsId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete<INews>(`/api/news/{id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete news");
    }
  }
);

// Обновление новости
export const updateNews = createAsyncThunk<INews, INews>(
  "news/updateNews",
  async (newsData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put<INews>(`/api/news/{id}`, newsData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update news");
    }
  } 
);
// Получение новости по ID
export const getNewsById = createAsyncThunk<INews, number>(
  "/api/news/{id}",
  async (_newsId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<INews>(`/api/news/{id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch news");
    }
  }   
);


// Получение новостей из API
export const fetchNews = createAsyncThunk<INews[], void>(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<INews[]>("/api/news"); // Измените URL на правильный
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch news");
    }
  }
);
