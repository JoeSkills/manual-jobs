import Navbar from '../navbar';
import { Box, Typography } from '@mui/material';
import UserDataTableViewer from '../widgets/UserDataTableViewer';

const index = () => {
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

export default index;
