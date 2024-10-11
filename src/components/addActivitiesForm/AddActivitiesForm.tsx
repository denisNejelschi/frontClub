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
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("address", address);
    formData.append("startDate", startDate);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    try {
      const response = await axios.post("api/activity", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        setSuccessMessage("Мероприятие успешно добавлено!");
        clearForm();
        onSuccess();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data.message ||
            "Произошла ошибка при добавлении мероприятия"
        );
      } else {
        setErrorMessage("Произошла ошибка при добавлении мероприятия");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const clearForm = () => {
    setTitle("");
    setAddress("");
    setStartDate("");
    setImage(null);
    setImageUrl("");
    setDescription("");
  };

  return (
    <div className={style.formContainer}>
      <h2 className={style.heading}>Добавить новое мероприятие</h2>
      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
      {successMessage && (
        <p className={style.successMessage}>{successMessage}</p>
      )}
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
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
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
