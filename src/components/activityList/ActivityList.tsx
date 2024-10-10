import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ActivityList: React.FC = () => {
    const [filteredActivities, setFilteredActivities] = useState<IActivity[]>([]);
    const navigate = useNavigate();


  return (
    <>
      <div className={styles.headerContainer}>
        <h2 className={styles.pageTitle}>Activities</h2>
        <Link to="addActivity" className={`${buttonStyles.button} ${styles.addButton}`}>
        Add Activity
        </Link>
      </div>


    return (
        <>
            <div className={styles.headerContainer}>
                <h2 className={styles.pageTitle}>Активности</h2>
                <button className={`${buttonStyles.button} ${styles.addButton}`}>
                    Добавить активность
                </button>
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
              Start: {activity.startDate}
              </p>
              <p className={styles.activityDescription}>
                {activity.description}
              </p>
              <button
                className={buttonStyles.button}
                aria-label={`More about о ${activity.title}`}
              >
                More
              </button>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            No activities matching the query.
          </div>
        )}
      </div>
    </>
  );

};

export default ActivityList;
