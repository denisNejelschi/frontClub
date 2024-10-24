
import React, { useState, useEffect } from 'react';

function EditProfile() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState({
        username: '',
        email: '',
       // password: '',
        id: ''
    });

    // Проверка наличия токена при загрузке компонента
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAccessToken(token);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Функция для загрузки информации о пользователе
    const fetchUserData = async () => {
        if (!accessToken) return;

        try {
            const response = await fetch(`/api/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUser(data); // API возвращает объект с полями пользователя
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        }
    };

    // Загружаем данные пользователя при наличии токена
    useEffect(() => {
        if (accessToken) {
            fetchUserData();
        }
    }, [accessToken]);

    // Обработчик изменения полей формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Обработчик отправки формы для сохранения изменений
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!accessToken || !user.id) {
            alert('Не удалось обновить данные. Токен или ID пользователя отсутствуют.');
            return;
        }

        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    // Можно добавить другие поля для обновления
                }),
            });

            if (!response.ok) {   //TODO выводится эта ошибка!!!
                throw new Error('Failed to update user data');
            }

            const updatedUser = await response.json();
            setUser(updatedUser); // Обновляем состояние с новыми данными
            alert('Данные успешно обновлены!');
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя:', error);
        }
    };

    if (!isAuthenticated) {
        return <div>Пожалуйста, войдите в систему для просмотра профиля.</div>;
    }

    return (
        <div>
            <h2>Мой профиль</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                {/*<div>*/}
                {/*    <label>Пароль:</label>*/}
                {/*    <input*/}
                {/*        type="password"*/}
                {/*        name="password"*/}
                {/*        // value={user.password}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</div>*/}
                <button type="submit">Сохранить изменения</button> TODO!!!
            </form>
        </div>
    );
}

export default EditProfile;



