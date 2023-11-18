import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../state';
import { useEffect } from 'react';
import { verifyIsLogged } from '../utils';
import Navbar from '../navbar';
import { Box, Grid } from '@mui/material';

const Index = () => {
  const navigate = useNavigate();
  const token = useSelector((state: State) => state.token);

  useEffect(() => {
    verifyIsLogged(navigate, token);
  }, [token, navigate]);
  return (
    <div>
      <Navbar />

      <Box
        bgcolor={'#2C3E50'}
        textAlign={'center'}
        padding={3}
        color={'#d4c31b'}
        fontWeight={'700'}
        fontSize={'1.5rem'}
      >
        Application Form For The Manual Jobs Service
      </Box>
      <Box bgcolor={'#f5f5f5'}>
        <Grid container>
          <Grid></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Index;
