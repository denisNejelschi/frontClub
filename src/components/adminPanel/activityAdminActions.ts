import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Получение всех активностей
export const fetchAllActivities = createAsyncThunk(
  "admin/fetchAllActivities",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/activity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch activities");
    }
  }
);

// Создание активности
export const createActivity = createAsyncThunk(
  "admin/createActivity",
  async (activityData: { title: string; address: string; startDate: string; image: string; description: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/activity", activityData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create activity");
    }
  }
);

// Обновление активности
export const updateActivity = createAsyncThunk(
  "admin/updateActivity",
  async ({ id, activityData }: { id: number; activityData: Partial<{ title: string; address: string; startDate: string; image: string; description: string }> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/activity/update/${id}`, activityData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update activity");
    }
  }
);

// Удаление активности
export const deleteActivity = createAsyncThunk(
  "admin/deleteActivity",
  async (activityId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/activity/${activityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return activityId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete activity");
    }
  }
);
