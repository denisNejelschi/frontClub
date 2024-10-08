import React, { useState } from 'react';
import axios from 'axios';
import style from './formAddActivities.module.css';

interface AddActivityFormProps {
  onSuccess: () => void;
}

const AddActivityForm: React.FC<AddActivityFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newActivity = {
      title,
      address,
      startDate,
      image,
      description,
    };

    try {
      const response = await axios.post('/api/activity', newActivity);
      if (response.status === 201) {
        setSuccessMessage('Мероприятие успешно добавлено!');
        clearForm();
        onSuccess(); 
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message || 'Произошла ошибка при добавлении мероприятия');
      } else {
        setErrorMessage('Произошла ошибка при добавлении мероприятия');
      }
    }
  };

  const clearForm = () => {
    setTitle('');
    setAddress('');
    setStartDate('');
    setImage('');
    setDescription('');
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
          placeholder="URL изображения"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className={style.submitButton}>Добавить мероприятие</button>
      </form>
    </div>
  );
};

export default AddActivityForm;
