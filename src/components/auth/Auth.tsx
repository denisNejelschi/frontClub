import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch } from '../../app/hooks';
import Button from '../button/Button';
import Input from '../input/Input'; 
import { loginUser, registerUser, resetPassword } from './features/authAction';
import styles from './auth.module.css';
import { useState } from 'react';
import Loader from '../loader/Loader';

export interface IFormValues {
  username: string;
  password: string;
  confirmPassword?: string;
  email: string;
  dob: string;
}

const stringRequired = (min: number, max: number) =>
  Yup.string().required('Обязательное поле').min(min, `Минимум ${min} символов`).max(max, `Максимум ${max} символов`);

const schema = Yup.object().shape({
  username: stringRequired(2, 20),
  password: stringRequired(2, 20),
  confirmPassword: Yup.string()
    .when('isRegistering', {
      is: true,
      then: (schema) => schema.required('Обязательное поле для подтверждения пароля')
        .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
      otherwise: (schema) => schema.notRequired(),
    }),
  email: Yup.string().required('Обязательное поле')
    .email('Неверный формат email')
    .when('isRegistering', {
      is: true,
      then: (schema) => schema.required('Обязательное поле'),
      otherwise: (schema) => schema.notRequired(),
    }),
  dob: Yup.string().when('isRegistering', {
    is: true,
    then: (schema) => schema.required('Обязательное поле'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      dob: '',
    } as IFormValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values: IFormValues, { resetForm }) => {
      setLoading(true);
      setErrorMessage('');
      try {
        if (isRecovering) {
          await dispatch(resetPassword({ email: values.email! })).unwrap();
          alert('Письмо для восстановления пароля отправлено на ваш email.');
        } else if (isRegistering) {
          await dispatch(registerUser({
            username: values.username,
            password: values.password,
            email: values.email!,
          })).unwrap();
          alert('Регистрация прошла успешно!');
        } else {
          await dispatch(loginUser(values)).unwrap();
          alert('Вход прошел успешно!');
        }
        resetForm();
        navigate('/');
      } catch (error) {
        const errorMsg = isRecovering 
          ? "Восстановление пароля не удалось. Проверьте введенный email."
          : isRegistering 
          ? "Регистрация не удалась. Попробуйте снова." 
          : "Вход не удался. Проверьте имя пользователя и пароль.";
        setErrorMessage(errorMsg);
        console.error(errorMsg, error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <h2>{isRecovering ? 'Восстановление пароля' : isRegistering ? 'Создать аккаунт' : 'Войти'}</h2>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={formik.handleSubmit} className={styles.container}>
          <div aria-live="polite" role="alert">
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          </div>
          {isRecovering ? null : (
            <Input
              name='username'
              placeholder='Имя пользователя'
              type='text'
              error={formik.errors.username}
              value={formik.values.username}
              onChange={formik.handleChange}
              disabled={isRecovering}
            />
          )}
          <Input
            name='password'
            placeholder='Пароль'
            type='password'
            error={formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {isRegistering && (
            <>
              {/* <Input
                name='confirmPassword'
                placeholder='Подтвердите пароль'
                type='password'
                error={formik.errors.confirmPassword}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              /> */}
              {/* <div aria-live="polite" role="alert">
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          </div> */}
              <Input
                name='email'
                placeholder='Email'
                type='email'
                error={formik.errors.email}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {/* <Input
                name='dob'
                placeholder='Дата рождения (YYYY-MM-DD)'
                type='date'
                error={formik.errors.dob}
                value={formik.values.dob}
                onChange={formik.handleChange}
              /> */}
            </>
          )}
          {isRecovering && (
            <Input
              name='email'
              placeholder='Введите ваш Email для восстановления'
              type='email'
              error={formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          )}
          <Button type='submit' name={isRecovering ? 'Восстановить' : (isRegistering ? 'Зарегистрироваться' : 'Войти')} disabled={loading} />
        </form>
      )}
      <div>
        {!isRecovering && !isRegistering && (
          <>
            <button onClick={() => setIsRegistering(true)}>Зарегистрироваться</button>
            <button onClick={() => setIsRecovering(true)}>Забыли пароль?</button>
          </>
        )}
        {isRecovering && (
          <button onClick={() => setIsRecovering(false)}>Вернуться к входу</button>
        )}
        {isRegistering && (
          <button onClick={() => setIsRegistering(false)}>Уже есть аккаунт? Войти</button>
        )}
      </div>
    </div>
  );
}
