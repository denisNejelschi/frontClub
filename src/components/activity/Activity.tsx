import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './activity.module.css';
import buttonStyles from '../button/button.module.css';

// Define the IActivity interface here
interface IActivity {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Activity = () => {
  const initialValue: IActivity = {
    id: 0,
    title: '',
    description: '',
    image: '',
  };

  const [activity, setActivity] = useState<IActivity>(initialValue);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/test`)
      .then(res => res.json())
      .then(data => setActivity(data));
  }, [id]);

  return (
    <div className={styles.activityContainer}>
      {activity.title && (
        <>
          <h1>{activity.title}</h1>
          <p>{activity.description}</p>
          <img width={300} src={activity.image} alt={activity.title} />
          <Link to={'/shop-page'}>
            <button className={buttonStyles.button}>назад</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Activity;
