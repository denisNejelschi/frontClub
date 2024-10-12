import { createSlice } from '@reduxjs/toolkit';
import { getActivities } from './reduxActivitiesAction';
import { IActivity } from './types';

// в нашем объекте мы сможем обработать три состояния promise данных

// 1. isLoading - ожидание
// 2. activities - успех
// 3. error - ошибку


interface IActivitySlice {
  activities: IActivity[];
  isLoading: boolean,
  error: string;
}

const initialState: IActivitySlice = {
  activities: [],
  isLoading: false,
  error: '',
};

// создаем настройки для работы со store
// файл создается с помощью функции creteSlice()
// в качестве параметра вы передаете настройки для вашего store

export const reduxActivitiesSlice = createSlice({
  // имя, которое должно быть уникальным - строка
  name: 'reduxActivities',
  // начальные значения
  initialState,
  // обработчики синхронных действий
  reducers: {
    cleanActivities:(state) => {
      state.activities = []
    }
  },
  // обработчик асинхронных действий
  extraReducers: (builder) => {
    builder
      // в случае начала загрузки мы включим loader
       //в параметре state мы работаем с данными в state
      .addCase(getActivities.pending, (state) => {
        state.isLoading = true;
      })
      // в случае успеха мы подгрузим данные
      // и выключим loader
      // из параметра action мы забираем данные из результата запроса
      .addCase(getActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        // здесь мы получаем данные пришедшие из getActivities в случае успеха
        state.activities = action.payload;
      })
      // здесь мы обрабатываем ошибку
      // выключаем loader
      // обнуляем стейт
      // и показываем ошибку
      .addCase(getActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.activities = [];
        state.error = action.payload as string;
      });
  },
});

export default reduxActivitiesSlice;

// на случай синхронных операций
export const { cleanActivities } = reduxActivitiesSlice.actions
