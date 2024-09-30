import React from "react";
import styles from "./header.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../auth/features/authSlice";
import { links } from "./links";
import { cleanActivities } from "../auth/reduxActivities/reduxActivitiesSlice";

export const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { user } = useAppSelector(store => store.user);

    const handleLogout = () => {
        localStorage.removeItem('club-token');
        dispatch(logoutUser());
        dispatch(cleanActivities());
    };

    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <h1>Conversation Club</h1>
            </div>
            <nav>
                {user.username ? (
                    <>
                        {links.map((el, index) => (
                            <Link
                                key={index}
                                className={location.pathname === el.pathname ? styles.active : ''}
                                to={el.pathname}
                            >
                                {el.title}
                            </Link>
                        ))}
                        <Link onClick={handleLogout} to='/'>Sign out</Link>
                    </>
                ) : (
                    <>
                        <Link to='/login'>Sign in</Link>
                    </>
                )}
            </nav>
        </header>
    );
};
