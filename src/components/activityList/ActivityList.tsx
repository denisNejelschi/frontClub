import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./activityList.module.css";
import buttonStyles from "../button/button.module.css";
import SearchBar from "../searchBar/SearchBar";
import ScrollToTopButton from "../scrollToTopButton/ScrollToTopButton";

interface IActivity {
    id: number;
    title: string;
    image: string;
    startDate: string;
    // description: string;
    // address: string;
}

const ActivityList: React.FC = () => {
    const [filteredActivities, setFilteredActivities] = useState<IActivity[]>([]);
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h2 className={styles.pageTitle}>Активности</h2>
                <button
                    className={`${buttonStyles.button} ${styles.addButton}`}
                    onClick={() => navigate("/activityList/addActivity")}
                >
                    Добавить активность
                </button>
            </div>

            <SearchBar onFiltered={setFilteredActivities} />

            <div className={styles.activityListContainer}>
                {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                        <div key={activity.id} className={styles.activityCard}>
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className={styles.activityImage}
                            />
                            <h3 className={styles.activityTitle}>{activity.title}</h3>
                            {/* <p className={styles.activityAddress}>{activity.address}</p> */}
                            <p className={styles.activityStartDate}>
                                Начало: {activity.startDate}
                            </p>
                            {/* <p className={styles.activityDescription}>
                {activity.description}
              </p> */}
                            <Link
                                to={`/activityList/${activity.id}`}
                                state={{ activity }} // Передаем объект activity через state
                                className={buttonStyles.button}
                                aria-label={`Подробнее о ${activity.title}`}
                            >
                                Подробнее
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className={styles.noActivitiesMessage}>
                        Нет доступных активностей.
                    </p>
                )}
            </div>

          ))
        ) : (
          <div className={styles.noResults}>
            Нет активностей, соответствующих запросу.
          </div>
        )}
      </div>
      '<ScrollToTopButton />'
    </>
  );


export default ActivityList;
