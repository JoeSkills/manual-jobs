import { Box, Chip, Typography } from '@mui/material';
import Navbar from '../navbar';
import { useSelector } from 'react-redux';
import { State } from '../state';
import ApplicationSwitchNavWidget from '../widgets/ApplicationSwitchNavWidget';
import { SERVER_PORT } from '../constants';

const UserDataListItem = ({
  listItemData,
  listItemLabel,
}: {
  listItemData?: string | number | boolean | undefined;
  listItemLabel: string;
}) =>
  typeof listItemData !== 'boolean' ? (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Typography
        fontWeight={'500'}
        color={'#d4c31b'}
        textTransform={'uppercase'}
      >
        {listItemLabel}:
      </Typography>
      <Typography
        fontWeight={'500'}
        color={'#fff'}
        sx={{ wordBreak: 'break-all' }}
        textAlign={'right'}
        textOverflow={'ellipsis'}
        fontStyle={'italic'}
        marginTop={'8px'}
      >
        {listItemData}
      </Typography>
    </Box>
  ) : (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Typography
        fontWeight={'500'}
        color={'#d4c31b'}
        textTransform={'uppercase'}
      >
        {listItemLabel}:
      </Typography>
      <Chip
        label={listItemData === false ? 'False' : 'True'}
        color={listItemData === false ? 'error' : 'success'}
        sx={{
          marginTop: '8px',
        }}
      />
    </Box>
  );

const Index = () => {
  const { username, gender, email, phoneNumber, accepted, userImg } =
    useSelector((state: State) => state.user) || {
      gender: '',
      username: '',
      _id: '',
      phoneNumber: '',
      userImg: '',
      accepted: false,
      email: '',
    };

  const userDataList = [
    { listItemLabel: 'Username', listItemData: username },
    { listItemLabel: 'Email', listItemData: email },
    { listItemLabel: 'Gender', listItemData: gender },
    { listItemLabel: 'Phone Number', listItemData: phoneNumber },
    { listItemLabel: 'Accepted', listItemData: accepted },
  ];

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

      <ApplicationSwitchNavWidget />
      <Box bgcolor={'#f5f5f5'} padding={{ sm: '6.25rem', xs: 2 }}>
        <Typography
          fontWeight={'500'}
          fontSize={'1rem'}
          color={'#2C3E50'}
          textAlign={'center'}
          marginBottom={'1.5625rem'}
          fontStyle={'italic'}
        >
          Welcome, {username}
        </Typography>
        <Typography
          fontWeight={'700'}
          fontSize={'1.5rem'}
          color={'#2C3E50'}
          textAlign={'center'}
          marginBottom={'2.1875rem'}
        >
          Here you can preview your changes to your application
        </Typography>

        <img
          src={`${SERVER_PORT}/images/${userImg}`}
          style={{
            width: '12.5rem',
            height: '12.5rem',
            borderRadius: '50%',
            marginInline: 'auto',
            display: 'block',
          }}
        />

        <Box
          bgcolor={'#192123'}
          padding={2}
          mt={2}
          fontSize={'14px'}
          width={{ sm: '50vw', xs: '100%' }}
          color={'rgb(30, 41, 59)'}
          borderRadius={'3px'}
          mx={'auto'}
        >
          {userDataList.map((data) => {
            return <UserDataListItem {...data} key={data.listItemLabel} />;
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Index;
