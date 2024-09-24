import React from "react";
import styles from "./header.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../auth/features/authSlice";
import { cleanProducts } from "../auth/reduxProducts/reduxProductsSlices";
import { links } from "./links";

export const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { user } = useAppSelector(store => store.user);

    const handleLogout = () => {
        localStorage.removeItem('shop-token');
        dispatch(logoutUser());
        dispatch(cleanProducts());
    };

    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <h1>----- Speaking Club -----</h1>
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
                        <Link onClick={handleLogout} to='/'>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to='/login'>Login</Link>
                    </>
                )}
            </nav>
        </header>
    );
};
