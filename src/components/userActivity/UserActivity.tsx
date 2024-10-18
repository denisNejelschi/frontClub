import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./userActivity.module.css";
import buttonStyles from "../button/button.module.css";
import ScrollToTopButton from "../scrollToTopButton/ScrollToTopButton";
import { useAppSelector } from "../../app/hooks.ts";

interface IActivity {
    id: number;
    title: string;
    image: string;
    startDate: string;
    description: string;
    authorId: number;
}

const UserActivity: React.FC = () => {
    const [userActivities, setUserActivities] = useState<IActivity[]>([]);
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null); // To handle loading state for deleting a specific activity

    const fetchUserActivities = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/activity/user/activities/created", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUserActivities(response.data);
        } catch (error) {
            setError("Error loading the assets. Please try again later.");
            console.error("Error fetching user activities:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (activityId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
        if (!confirmDelete) return;

        setDeleting(activityId);
        try {
            await axios.delete(`/api/activity/${activityId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("Activity deleted successfully.");
            setUserActivities((prevActivities) =>
                prevActivities.filter((activity) => activity.id !== activityId)
            );
        } catch (error) {
            console.error("Error deleting activity:", error);
            alert("Failed to delete the activity. Please try again.");
        } finally {
            setDeleting(null);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserActivities();
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className={styles.headerContainer}>
                <h2 className={styles.pageTitle}>Your activities</h2>
            </div>
            <div className={styles.activityUserContainer}>
                {userActivities.length > 0 ? (
                    userActivities.map((activity) => (
                        <div key={activity.id} className={styles.activityList}>
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className={styles.activityImage}
                            />
                            <h3 className={styles.activityTitle}>{activity.title}</h3>
                            <p className={styles.activityStartDate}>
                                Начало: {activity.startDate}
                            </p>
                            <p className={styles.activityDescription}>{activity.description}</p>
                            <div className={styles.buttonContainer}>
                                <Link
                                    to={`/activityList/${activity.id}`}
                                    state={{ activity }}
                                    className={buttonStyles.button}
                                    aria-label={`more ${activity.title}`}
                                >
                                    More
                                </Link>
                                <button
                                    onClick={() => handleDelete(activity.id)}
                                    className={`${buttonStyles.button} ${buttonStyles.deleteButton}`}
                                    disabled={deleting === activity.id}
                                >
                                    {deleting === activity.id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>You have no created activities.</div>
                )}
            </div>
            <ScrollToTopButton />
        </>
    );
};

export default UserActivity;
