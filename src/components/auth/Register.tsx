import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch } from '../../app/hooks';
import Button from '../button/Button';
import Input from '../input/Input';
import { registerUser } from './features/authAction';
import styles from './auth.module.css';
import { useState } from 'react';
import Loader from '../loader/Loader';

export interface IRegisterFormValues  {
  username: string;
  password: string;
  email: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
  .required('Required field')
  .min(2, 'Minimum 2 characters')
  .max(20, 'Maximum 20 characters'),
email: Yup.string()
  .required('Required field')
  .email('Invalid email format'),
password: Yup.string()
  .required('Required field')
  .min(2, 'Minimum 2 characters')
  .max(20, 'Maximum 20 characters'),
});

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
    } as IRegisterFormValues ,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values: IRegisterFormValues , { resetForm }) => {
      setLoading(true); 
      
      try {
        await dispatch(registerUser({
          username: values.username,
          password: values.password,
          email: values.email,
        })).unwrap();
        
        setSuccessMessage('Registration successful!');
        resetForm(); 
        navigate('/'); 
      } catch (error) {
        setErrorMessage(typeof error === 'string' ? error : "Registration failed. Please try again.");
        console.error('Registration error:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <section>
      <h2>Create Account</h2>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={formik.handleSubmit} className={styles.container}>
          <div aria-live="polite" role="alert">
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            {successMessage && <div className={styles.success}>{successMessage}</div>}
          </div>
          <Input
            name='username'
            placeholder='Username'
            type='text'
            error={formik.errors.username}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <Input
            name='email'
            placeholder='Email'
            type='email'
            error={formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Input
            name='password'
            placeholder='Password'
            type='password'
            error={formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Button type='submit' name='Register' disabled={loading} />
          <Link to='/login' className={styles.link}>Sing In</Link>
        </form>
      )}
    </section>
  );
}
