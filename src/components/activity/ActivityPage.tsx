import React, { useState } from "react";
import AddActivityForm from "../addActivitiesForm/AddActivitiesForm";
import ActivityList from "../activityList/ActivityList";
import styles from "./activityPage.module.css";

const ActivityPage: React.FC = () => {
  const [reload, setReload] = useState(false);

  const handleActivityAdded = () => {
    setReload((prev) => !prev);
  };

  return (
    <div className={styles.activityPageContainer}>
      <AddActivityForm onSuccess={handleActivityAdded} />
      <ActivityList key={reload.toString()} activities={[]} />
    </div>
  );
};

export default ActivityPage;
