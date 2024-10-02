import React, { useEffect, useState } from "react";
import axios from "axios";
import ActivityCard from "./ActivityCard"; // Импортируем компонент карточки активности
import styles from "./activityList.module.css"; // Импортируем стили

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
}

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/api/activity");
        setActivities(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка при загрузке активностей:", err); // Логируем ошибку
        setError("Не удалось загрузить активности.");
        setLoading(false);
      }
    };
  
    fetchActivities();
  }, []);

  if (loading) {
    return <p>Загрузка активностей...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.activityList}>
      {activities.length === 0 ? (
        <p>Активности не найдены.</p>
      ) : (
        activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            title={activity.title}
            description={activity.description}
            image={activity.image}
            onMoreDetails={() => console.log(`Детали активности с ID: ${activity.id}`)}
          />
        ))
      )}
    </div>
  );
};

export default ActivityList;
