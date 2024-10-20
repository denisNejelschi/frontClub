import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUsers } from "./adminActions";
import { RootState, AppDispatch } from "../../app/store"; // Импортируйте типы


const UserList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Используем AppDispatch для типизации dispatch
  const { users, loading, error } = useSelector((state: RootState) => state.admin); // Проверяем правильность имен полей

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  if (loading) return <p>Loading...</p>; // Используем loading вместо isLoading
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
