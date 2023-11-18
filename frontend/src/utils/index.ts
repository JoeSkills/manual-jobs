import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { SERVER_PORT } from '../constants';

export const verifyIsLogged = (navigate: NavigateFunction, token: string) => {
  axios
    .post(`${SERVER_PORT}/auth/`, {
      token,
    })
    .then((response) => {
      if (response.data.status === false) return navigate('/login');
    })
    .catch(() => navigate('/login'));
};
