import { ChangeEvent } from 'react';
import styles from './input.module.css';

interface IInputProps {
  name?: string,
  placeholder?: string,
  type?: string,
  label?: string,
  value?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  error?: string;
  id?: string;
}

function Input({
  name,
  placeholder = '',
  label,
  value = '', 
  onChange,
  error,
  id
}: IInputProps) {
  const inputId = id || name; 

  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
      <input
        className={styles.input}
        id={inputId}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default Input;
