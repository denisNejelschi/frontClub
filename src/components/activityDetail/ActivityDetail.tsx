import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './activityDetail.module.css';

import BackButton from '../backButton/BackButton';


interface Activity {
    id: number;
    title: string;
    address: string;
    startDate: string;
    image: string;
    description: string;
}

const ActivityDetail: React.FC = () => {
    const location = useLocation();
    const activity = location.state?.activity as Activity | undefined;

    if (!activity) {

        return <div>Activity not found</div>;

    }

    return (
        <div className={styles.activityDetailContainer}>
            <h1 className={styles.activityDetailTitle}>{activity.title}</h1>
            <img src={activity.image} alt={activity.title} className={styles.activityDetailImage} />

            <p className={styles.activityDetailAddress}><strong>Address:</strong> {activity.address}</p>
            <p className={styles.activityDetailDate}><strong>Date:</strong> {activity.startDate}</p>
            <p className={styles.activityDetailDescription}>{activity.description}</p>
            <BackButton />
        </div>
        

    );
};

export default ActivityDetail;
