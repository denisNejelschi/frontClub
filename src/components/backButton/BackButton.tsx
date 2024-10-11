import React from "react";
import styles from "./backButton.module.css";

const BackButton: React.FC = () => {
    return (
        <button onClick={() => window.history.back()} className={styles.backButton}>
            Назад
        </button>
    );
};

export default BackButton;