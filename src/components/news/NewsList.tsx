import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchNews } from './newsActions';
import NewsItem from './NewsItem';
import './newsList.module.css';

const NewsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, isLoading, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (isLoading) {
    return <p>Загрузка новостей...</p>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
  }

  return (
    <div className="news-list">
      <h1>Новости</h1>
      <ul>
        {news.map((article: { id: React.Key | null | undefined; }) => (
          <NewsItem key={article.id} article={article} /> // Используем компонент NewsItem для каждой статьи
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
