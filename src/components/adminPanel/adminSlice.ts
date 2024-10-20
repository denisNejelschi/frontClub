import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllUsers, deleteUser, updateUser, createUser, getUser } from "./adminActions";
import { IUser } from "../auth/features/authSlice"; // Предположим, что IUser уже определен в authSlice

// Интерфейс для состояния admin
interface AdminState {
  users: IUser[];
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: AdminState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

// Создание slice
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Синхронные действия могут быть добавлены здесь при необходимости
  },
  extraReducers: (builder) => {
    // Обрабатываем асинхронные действия для fetchAllUsers
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Обрабатываем асинхронные действия для deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Обрабатываем асинхронные действия для updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Обрабатываем асинхронные действия для getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Обрабатываем асинхронные действия для createUser
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Экспортируем редьюсер
export default adminSlice.reducer;
