import React from "react";
import styles from "./activityCard.module.css";
import { Link } from "react-router-dom";
import Button from "../button/Button"; // Импорт компонента Button

interface ActivityCardProps {
  id: number;
  title: string;
  // description: string;
  image: string;
  onMoreDetails: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  id, // ID активности
  title, // Заголовок активности
  // description, // Описание активности (закомментировано)
  image, // Изображение активности
  onMoreDetails, // Функция для обработки "Подробнее"
}) => {
  return (
    <div className={styles.activityCard}>
      <img src={image} alt={title} className={styles.activityImage} />
      <h3 className={styles.activityTitle}>{title}</h3>
      {/* <p className={styles.activityDescription}>{description}</p> */} {/* Описание закомментировано */}
      <Link to={`/activity/${id}`}> {/* Используем id в URL */}
        <Button name="More details" onClick={onMoreDetails}></Button>
      </Link>
    </div>
  );
};

export default ActivityCard;