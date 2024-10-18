import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../auth/features/authSlice";

// Получение всех пользователей (доступно администратору)
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/users", {
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

// Удаление пользователя (доступно администратору)
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      // Поскольку при удалении пользователь может не возвращать тело ответа, проверим на это
      await axios.delete(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return userId; // Возвращаем ID удаленного пользователя
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);

// Обновление данных пользователя (доступно администратору или пользователю)
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, userData }: { id: number; userData: Partial<IUser> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/users/${id}`, userData, {
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

// Получение пользователя (доступно администратору или пользователю)
export const getUser = createAsyncThunk(
  "admin/getUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/users/${userId}`, {
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
  async (userData: { username: string; password: string; email: string }, { rejectWithValue }) => {
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

// Обновление профиля пользователя (доступно администратору или пользователю)
export const updateUserProfile = createAsyncThunk(
  "admin/updateUserProfile",
  async (userData: { username: string; email: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("/api/users/profile", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user profile");
    }
  }
);
