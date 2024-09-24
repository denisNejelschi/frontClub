import React, { useEffect } from "react";

import { getProducts } from "./reduxProductsAction";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";


function ReduxProduct() {
    const {products, isLoading, error} = useAppSelector(store => store.reduxProducts)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            <h3>ReduxProduct</h3>
            <p>В компоненте у нас будет два главных инструмента для работы с redux:</p>
            <ul>
                <li>useAppDispatch() - функция, внутри которой мы вызываем action и отправляем запрос</li>
                <li>useAppSelector() - функция, в которой мы забираем изменения данных из store в любой компонент в приложении</li>
            </ul>
            <h3>Our products from redux</h3>
            {isLoading && <h4>Loading...</h4>}
            {products && products.map(el => (
                <p>{el.title}</p>
            ))}
            {error && <p style={{color: 'red'}}>{error}</p>} 
        </div>
    );
}

export default ReduxProduct;
