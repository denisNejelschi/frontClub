import React from "react";
import ActivityCard from "./ActivityCard"; // Импорт компонента ActivityCard
import "./activityCard.module.css"; // Импорт стилей для ActivityCard

// Данные о  активностях
const activities = [
  { id: 0, title: "", image: "" },
];

// Компонент ActivityList
const ActivityList: React.FC = () => {
  // Обработчик события "Подробнее"
  const handleMoreDetails = (title: string) => {
    alert(`More details about ${title}`); // Показывает всплывающее окно с заголовком 
  };

  return (
    // Контейнер для карточек
    <div className="activity_Card_Container"> 
      {/*  Перебираем массив activities и рендерим ActivityCard для каждой активности */}
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id} // Уникальный ключ для каждой карточки
          id={activity.id} // ID активности
          title={activity.title} // Заголовок активности
          // description={activity.description} // Описание активности (закомментировано)
          onMoreDetails={() => handleMoreDetails(activity.title)} // Передает обработчик события в ActivityCard
          image={activity.image} // Используем значение image из массива activities
        />
      ))}
    </div>
  );
};

export default ActivityList;
