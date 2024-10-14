import React, { useState } from "react";
import axios from "axios";
import style from "./formAddActivities.module.css";

interface AddActivityFormProps {
  onSuccess: () => void;
}

const AddActivityForm: React.FC<AddActivityFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [image, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);  // Очистить предыдущее сообщение об ошибке
  
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage("No authentication token found. Please log in again.");
      return;
    }
  
    const data = {
      title,
      address,
      startDate,
      description,
      image // если это URL изображения, его можно отправить как строку
    };
  
    try {
      const response = await axios.post("http://localhost:8080/api/activity", data, {
        headers: {
          "Content-Type": "application/json", // Отправляем данные как JSON
          "Authorization": `Bearer ${token}`
        },
        validateStatus: function (status) {
          return status < 500; // Разрешаем только коды статуса ниже 500
        }
      });
  
      console.log('Full response:', response);
  
      if (response.status === 403) {
        setErrorMessage("Доступ запрещен. Пожалуйста, проверьте свои права доступа.");
        return;
      }
  
      if (response.status !== 200 && response.status !== 201) {
        setErrorMessage(`Ошибка сервера: ${response.status} ${response.statusText}`);
        return;
      }
  
      setSuccessMessage("Мероприятие успешно добавлено!");
      clearForm();
      onSuccess();
    } catch (error) {
      console.error('Full error object:', error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || `Произошла ошибка при добавлении мероприятия: ${error.message}`
        );
      } else {
        setErrorMessage(`Произошла ошибка при добавлении мероприятия: ${(error as Error).message}`);
      }
    }
  };
  

  const clearForm = () => {
    setTitle("");
    setAddress("");
    setStartDate("");
    setImageUrl("");
    setDescription("");
    setErrorMessage(null);  // Clear error message
  };

  return (
    <div className={style.formContainer}>
      <h2 className={style.heading}>Добавить новое мероприятие</h2>
      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
      {successMessage && <p className={style.successMessage}>{successMessage}</p>}
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Адрес"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL изображения (необязательно)"
          value={image}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className={style.submitButton}>
          Добавить мероприятие
        </button>
      </form>
    </div>
  );
};

export default AddActivityForm;
