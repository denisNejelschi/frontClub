import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../auth/features/authSlice";

// Интерфейс для параметров авторизации
interface LoginPayload {
  username: string;
  password: string;
}

// Асинхронное действие для входа
export const login = createAsyncThunk(
  "/api/admin/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", payload); // Ваш API эндпоинт для логина администратора
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Получение всех пользователей (доступно администратору)
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<IUser[]>("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const getUser = createAsyncThunk(
  "admin/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<IUser>("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

// Создание пользователя (доступно администратору)
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (userData: Partial<IUser>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/users", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create user");
    }
  }
);

//Получение информации о конкретном пользователе по его ID
export const getUserById = createAsyncThunk(
  "admin/getUserById",
  async (_userId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<IUser>(`/api/users/{id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

// Удаление пользователя (доступно администратору)
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/users/{id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);


// Обновление данных пользователя (доступно администратору или пользователю)
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, data }: { id: number; data: Partial<IUser> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/users/{id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);