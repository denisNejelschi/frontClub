import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const getActivities = createAsyncThunk(
  "activities",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/activity");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || axiosError.message
      );
    }
  }
);

export const addActivity = createAsyncThunk(
  "activities/addActivity",
  async (activityData: FormData, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Пользователь не авторизован");
    }

    try {
      const response = await axios.post("/api/activity", activityData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || axiosError.message
      );
    }
  }
);
