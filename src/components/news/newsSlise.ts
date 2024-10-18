import { createSlice } from '@reduxjs/toolkit';
import { fetchNews, INews } from './newsActions';

interface NewsState {
  news: INews[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
