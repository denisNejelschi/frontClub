import React from 'react';
import styles from './userProfile.module.css';
const UserProfile = () => {
    return (
        <div className={styles.userProfileContainer}>
            <h1 className={styles.userPageTitle}>Personal account</h1>
        </div>
    );
};

export default UserProfile;