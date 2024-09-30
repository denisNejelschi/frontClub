import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './activity.module.css';
import buttonStyles from '../button/button.module.css';

// Define the IActivity interface here   Vasili
interface IActivity {
  id: number;
  title: string;
  // description: string;
  image: string;
}

const Activity = () => {
  const initialValue: IActivity[] = []; //  Изменяем тип начального значения на массив
  const [activities, setActivities] = useState<IActivity[]>(initialValue); //  Изменяем тип состояния

  useEffect(() => {
    fetch(`/api/activity`) 
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  return (
    <div className={styles.activityContainer}>
      {activities.length > 0 && ( //  Проверяем, есть ли активности в массиве
        <>
          {activities.map(activity => ( //  Используем map для отображения каждой активности
            <div key={activity.id}>
              <h1>{activity.title}</h1>
              <h2>{activity.image}</h2>
              {/* <p>{activity.description}</p> */}
              {activity.image && <img width={300} src={activity.image} alt={activity.title} />}
              <Link to={`/activityList`}> {/* Предположим, что есть маршрут /activityList */}
                <button className={buttonStyles.button}>More details</button>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Activity;