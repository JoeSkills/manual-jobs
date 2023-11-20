import { Box, Typography } from '@mui/material';
import Navbar from '../navbar';
import { useSelector } from 'react-redux';
import { State } from '../state';
import { Link } from 'react-router-dom';

const Index = () => {
  const { username } = useSelector((state: State) => state.user) || {
    gender: '',
    username: '',
    _id: '',
    phoneNumber: '',
    userImg: '',
  };

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
      <Box
        p={2}
        fontSize={'14px'}
        textAlign={'center'}
        mt={2}
        color={'#001f3f '}
        fontWeight={'500'}
      >
        <Link to={'/application-form-submit'}>Application Form</Link>
        <Link to={'/user-profile-preview'} style={{ marginLeft: '10px' }}>
          Preview Application
        </Link>
      </Box>
      <Box bgcolor={'#f5f5f5'} padding={{ sm: '6.25rem', xs: 2 }}>
        <Typography
          fontWeight={'500'}
          fontSize={'1rem'}
          color={'#2C3E50'}
          textAlign={'center'}
          marginBottom={'1.5625rem'}
        >
          Welcome, {username}
        </Typography>
      </Box>
    </div>
  );
};

export default Index;
