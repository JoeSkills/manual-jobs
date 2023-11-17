import { useForm } from 'react-hook-form';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { setLogin } from '../state';
import { useDispatch } from 'react-redux/es/exports';
import { SERVER_PORT } from '../constants';

const schema = yup.object().shape({
  username: yup.string().required('Your username is required'),
  role: yup.string().required('Your role is required'),
  email: yup.string().email().required('Your email is required'),
  password: yup.string().min(8).max(32).required('Your password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
  secretKey: yup.string(),
});

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    secretKey?: string;
  }) => {
    if (data.secretKey)
      axios
        .post(`${SERVER_PORT}/auth/admin-key-verification`, {
          secretKey: data.secretKey,
        })
        .then((response) => {
          if (response.data.status === true)
            axios
              .post(`${SERVER_PORT}/auth/signup`, {
                ...data,
                role: 'admin',
              })
              .then((response) => {
                dispatch(
                  setLogin({
                    user: response.data.user,
                    token: response.data.token,
                  })
                );
                navigate('/admin-dashboard');
              })
              .catch(console.error);
        })
        .catch(console.error);
    else {
      axios
        .post(`${SERVER_PORT}/auth/signup`, {
          ...data,
          role: 'user',
        })
        .then((response) => {
          dispatch(
            setLogin({
              user: response.data.user,
              token: response.data.token,
            })
          );

          navigate('/application-form-submit');
        })
        .catch(console.error);
    }
  };

  const role = watch('role');

  return (
    <>
      <div className="container signup">
        <div className="heading">
          <h2 className="heading__text">Sign Up For Manual Jobs</h2>
        </div>
        <form className="admin-form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="admin-form__form-group">
            <label htmlFor="role">Register For:</label>
            <input
              type="radio"
              value={'user'}
              className="admin-form__form-group__input "
              required
              autoComplete="off"
              {...register('role')}
            />
            <span className="admin-form__form-group__user-type-label">
              {' '}
              User
            </span>
            <input
              type="radio"
              placeholder="Admin"
              className="admin-form__form-group__input "
              required
              autoComplete="off"
              value={'admin'}
              {...register('role')}
            />
            <span className="admin-form__form-group__user-type-label">
              Admin
            </span>
            <p
              className={`admin-form__form-group__input-error ${
                errors.role?.message &&
                'admin-form__form-group__input-error--error-display'
              }`}
            >
              {errors.role && errors.role.message}
            </p>
          </div>
          <br />
          <div className="admin-form__form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="admin-form__form-group__input "
              required
              autoComplete="off"
              {...register('username')}
            />
            <p
              className={`admin-form__form-group__input-error ${
                errors.username?.message &&
                'admin-form__form-group__input-error--error-display'
              }`}
            >
              {errors.username && errors.username.message}
            </p>
          </div>
          <div className="admin-form__form-group form-group--top-margin">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="admin-form__form-group__input "
              required
              autoComplete="off"
              {...register('email')}
            />{' '}
            <p
              className={`admin-form__form-group__input-error ${
                errors.email?.message &&
                'admin-form__form-group__input-error--error-display'
              }`}
            >
              {errors.email && errors.email.message}
            </p>
          </div>

          <div className="admin-form__form-group form-group--top-margin">
            <label htmlFor="password">Password</label>
            <div className="admin-form__form-group__input-wrapper">
              <input
                type="password"
                placeholder="Enter your password"
                required
                autoComplete="off"
                {...register('password')}
              />
              <p
                className={`admin-form__form-group__input-error ${
                  errors.password?.message &&
                  'admin-form__form-group__input-error--error-display'
                }`}
              >
                {errors.password && errors.password.message}
              </p>
            </div>
          </div>

          <div className="admin-form__form-group form-group--top-margin">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="admin-form__form-group__input-wrapper">
              <input
                type="password"
                placeholder="Confirm your password"
                required
                autoComplete="off"
                {...register('confirmPassword')}
              />
              <p
                className={`admin-form__form-group__input-error ${
                  errors.confirmPassword?.message &&
                  'admin-form__form-group__input-error--error-display'
                }`}
              >
                {errors.confirmPassword && errors.confirmPassword.message}
              </p>
            </div>
          </div>

          {role === 'admin' && (
            <div className="admin-form__form-group form-group--top-margin">
              <label htmlFor="secret-key">Secret Key</label>
              <div className="admin-form__form-group__input-wrapper">
                <input
                  type="password"
                  placeholder="Enter the secret key to login as an admin"
                  required
                  autoComplete="off"
                  {...register('secretKey')}
                />
                <p
                  className={`admin-form__form-group__input-error ${
                    errors.secretKey?.message &&
                    'admin-form__form-group__input-error--error-display'
                  }`}
                >
                  {errors.secretKey && errors.secretKey.message}
                </p>
              </div>
            </div>
          )}

          <div className="admin-form__form-group form-group--top-margin">
            <button className="admin-form__form-group__submit-btn">
              Sign Up
            </button>
          </div>
          <div className="admin-form__form-group form-group--top-margin-small">
            <Link to="/">Back to home</Link>
          </div>
          <div className="admin-form__form-group form-group--top-margin-small">
            If you already have an account <Link to="/login">login </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Index;
