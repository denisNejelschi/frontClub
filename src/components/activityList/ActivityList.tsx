import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'; 
import styles from "./activityList.module.css";
import buttonStyles from "../button/button.module.css";
import Loader from '../loader/Loader';

interface IActivity {
  id: number;
  title: string;
  image: string;
  startDate: string;
  description: string;
  address: string;
}

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get("api/activity");
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Не удалось загрузить активности. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.activityListContainer}>
      <div className={styles.addButtonContainer}>
        <Link to="addActivity" className={`${buttonStyles.button} ${styles.addButton}`}>Добавить</Link>
      </div>
      {activities.map((activity) => (
        <div key={activity.id} className={styles.activityList}>
          <img src={activity.image} alt={activity.title} className={styles.activityImage} />
          <h3 className={styles.activityTitle}>{activity.title}</h3>
          <p className={styles.activityAddress}>{activity.address}</p>
          <p className={styles.activityStartDate}>Начало: {activity.startDate}</p>
          <p className={styles.activityDescription}>{activity.description}</p>
          <button className={buttonStyles.button} aria-label={`Подробнее о ${activity.title}`}>
            Подробнее
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
