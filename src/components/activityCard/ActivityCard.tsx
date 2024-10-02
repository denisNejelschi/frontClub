import React from "react";
import styles from "./activityCard.module.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";

interface ActivityCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  onMoreDetails: (id: number) => void; // Передаем id для обработки в onMoreDetails
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  title,
  description,
  image,
  onMoreDetails,
}) => {
  const handleMoreDetails = () => {
    onMoreDetails(id); // Вызываем onMoreDetails с id
  };

  return (
    <div className={styles.activityCard}>
      <img src={image} alt={title} className={styles.activityImage} />
      <h3 className={styles.activityTitle}>{title}</h3>
      <p className={styles.activityDescription}>{description}</p>
      <Link to={`/activity/${id}`}> {/* Изменяем путь на id */}
        <Button name="More details" onClick={handleMoreDetails}></Button>
      </Link>
    </div>
  );
};

export default ActivityCard;
