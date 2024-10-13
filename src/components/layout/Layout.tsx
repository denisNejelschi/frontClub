import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { getActivities } from "../auth/reduxActivities/reduxActivitiesAction";
import { Header } from "../header/Header";
import styles from "../layout/layout.module.css";

export default function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // забираем token из браузерного хранилища
    const token = localStorage.getItem("token");
    // если токен не null (то есть существует)
    // делаем запрос за данными юзера с этим токеном
    if (token !== null) {
      // отправляем запрос из redux
      // dispatch(getUserWithToken(token));
      dispatch(getActivities());
    }
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
