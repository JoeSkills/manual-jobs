import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { SERVER_PORT } from '../constants';
import toast, { Toaster } from 'react-hot-toast';

const schema = Yup.object().shape({
  email: Yup.string().email().required('Your email is required'),
  password: Yup.string().min(8).max(32).required('Your password is required'),
});

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: { email: string; password: string }) => {
    toast
      .promise(
        axios.post(`${SERVER_PORT}/auth/login`, {
          ...data,
        }),
        {
          loading: 'Logging in...',
          error:
            'Invalid credentials. Please check your username and password.',
          success: 'Login successful! Welcome back.',
        }
      )
      .then((response) => {
        dispatch(
          setLogin({ user: response.data.user, token: response.data.token })
        );
        if (response.data.user.role === 'user')
          navigate('/application-form-submit');
        navigate('/admin-dashboard');
      });
  };

  return (
    <>
      <Toaster />
      <div className="container login">
        <div className="heading">
          <h2 className="heading__text">Login</h2>
        </div>
        <form className="admin-form" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="admin-form__form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="admin-form__form-group__input "
              required
              autoComplete="off"
              {...register('email')}
            />
            <p
              className={`admin-form__form-group__input-error ${
                errors.email?.message &&
                'admin-form__form-group__input-error--error-display'
              }`}
            >
              {errors.email?.message}
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
                {errors.password?.message}
              </p>
            </div>
          </div>

          <div className="admin-form__form-group form-group--top-margin">
            <button className="admin-form__form-group__submit-btn">
              Login
            </button>
          </div>
          <div className="admin-form__form-group form-group--top-margin-small">
            <Link to="/">Back to home</Link>
          </div>
          <div className="admin-form__form-group form-group--top-margin-small">
            If you don't have an account <Link to="/signup">signup </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Index;
