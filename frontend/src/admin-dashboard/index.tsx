import Navbar from '../navbar';
import { Box, Typography } from '@mui/material';
import UserDataTableViewer from '../widgets/UserDataTableViewer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../state';
import { useNavigate } from 'react-router-dom';
import { verifyIsLogged } from '../utils';

const Index = () => {
  const token = useSelector((state: State) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    verifyIsLogged(navigate, token);
  }, [token, navigate]);
  return (
    <>
      <Navbar />
      <Box padding={3}>
        <Typography marginBottom={2} fontWeight={'700'}>
          Manage People Signing Up For Applications
        </Typography>
        <UserDataTableViewer />
      </Box>
    </>
  );
};

export default Index;
