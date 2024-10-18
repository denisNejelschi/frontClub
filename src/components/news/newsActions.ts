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
