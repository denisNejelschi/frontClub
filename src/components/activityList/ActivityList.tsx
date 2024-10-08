import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./activityList.module.css";
import buttonStyles from "../button/button.module.css";
import SearchBar from "../searchBar/SearchBar";

interface IActivity {
    id: number;
    title: string;
    image: string;
    startDate: string;
    description: string;
    address: string;
}

const ActivityList: React.FC<{ activities: IActivity[] }> = ({ activities }) => {
    const [filteredActivities, setFilteredActivities] = useState<IActivity[]>(activities);
    const navigate = useNavigate();

    const handleClick = (activity: IActivity) => {
        navigate(`/activity/${activity.id}`, { state: { activity } });
    };

    return (
        <>
            <div className={styles.headerContainer}>
                <h2 className={styles.pageTitle}>Активности</h2>
                <Link to="addActivity" className={`${buttonStyles.button} ${styles.addButton}`}>
                    Добавить активность
                </Link>
            </div>

            <SearchBar onFiltered={setFilteredActivities} />

            <div className={styles.activityListContainer}>
                {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                        <div key={activity.id} className={styles.activityList}>
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className={styles.activityImage}
                            />
                            <h3 className={styles.activityTitle}>{activity.title}</h3>
                            <p className={styles.activityAddress}>{activity.address}</p>
                            <p className={styles.activityStartDate}>
                                Начало: {activity.startDate}
                            </p>
                            <p className={styles.activityDescription}>
                                {activity.description}
                            </p>
                            <button
                                className={styles.button}
                                onClick={() => handleClick(activity)}
                                aria-label={`Подробнее о ${activity.title}`}
                            >
                                Подробнее
                            </button>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>
                        Нет активностей, соответствующих запросу.
                    </div>
                )}
            </div>
        </>
    );
};

export default ActivityList;
