import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State, setLogin } from '../state';
import { useEffect, useState } from 'react';
import { verifyIsLogged } from '../utils';
import Navbar from '../navbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import PassportUploadWidget from '../widgets/PassportUploadWidget';
import PDFUploadWidget from '../widgets/PDFUploadWidget';
import axios from 'axios';
import { SERVER_PORT } from '../constants';
import ApplicationSwitchNavWidget from '../widgets/ApplicationSwitchNavWidget';

const Index = () => {
  const navigate = useNavigate();
  const token = useSelector((state: State) => state.token);
  const { username, _id, phoneNumber, userImg } = useSelector(
    (state: State) => state.user
  ) || {
    username: '',
    _id: '',
    phoneNumber: '',
    userImg: '',
  };
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user) || {
    gender: '',
    username: '',
    _id: '',
    phoneNumber: '',
    userImg: '',
  };

  const [defaultUserImg, setDefaultUserImg] = useState<
    null | string | undefined
  >(userImg);

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.number(),
    gender: Yup.string(),
    passportImgFile: Yup.mixed(),
    userDocsPDFFile: Yup.mixed(),
  });

  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      phoneNumber,
      gender: user.gender,
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
    setValue('gender', event.target.value as string);
  };

  const onSubmit = (data: {
    phoneNumber?: number;
    gender?: string;
    passportImgFile?: string;
  }) => {
    console.log(data);
    axios
      .patch(`${SERVER_PORT}/auth/update-user/${_id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch(setLogin({ user: response.data.user, token }));
        console.log(response);
      })
      .catch(console.warn);
  };

  useEffect(() => {
    verifyIsLogged(navigate, token);
  }, [token, navigate]);

  useEffect(() => {
    register('gender');
    register('passportImgFile');
    register('userDocsPDFFile');
  }, [register]);
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
          Carefully fill in the details to complete your registration
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} bgcolor={'#fff'} padding={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                placeholder="Your phone number"
                type="tel"
                {...register('phoneNumber')}
                label="Phone Number"
                defaultValue={phoneNumber}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  value={gender || user.gender}
                  label="gender"
                  onChange={handleChange}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="passport">
                <Typography fontSize={'0.875rem'}>Passport</Typography>
              </label>
              <PassportUploadWidget
                setValue={setValue}
                defaultValue={defaultUserImg}
                setDefaultUserImg={setDefaultUserImg}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="PDF">
                <Typography fontSize={'0.875rem'}>PDF</Typography>
              </label>
              <PDFUploadWidget setValue={setValue} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="warning" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Index;
