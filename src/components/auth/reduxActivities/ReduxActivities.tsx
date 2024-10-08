import React, { useEffect } from "react";
import { getActivities } from "./reduxActivitiesAction";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";




function ReduxActivity() {
    const {activities, isLoading, error} = useAppSelector(store => store.reduxActivities);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    return (
        <div>
            <h3>ReduxActivity</h3>
            <p>В компоненте у нас будет два главных инструмента для работы с redux:</p>
            <ul>
                <li>useAppDispatch() - функция, внутри которой мы вызываем action и отправляем запрос</li>
                <li>useAppSelector() - функция, в которой мы забираем изменения данных из store в любой компонент в приложении</li>
            </ul>
            <h3>Our activities from redux</h3>
            {isLoading && <h4>Loading...</h4>}
            {activities && activities.map(el => (
                <p>{el.title}</p>
            ))}
            {error && <p style={{color: 'red'}}>{error}</p>} 
        </div>
    );
}

export default ReduxActivity;
