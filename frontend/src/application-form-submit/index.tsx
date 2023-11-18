import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../state';
import { useEffect, useState } from 'react';
import { verifyIsLogged } from '../utils';
import Navbar from '../navbar';
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

const Index = () => {
  const navigate = useNavigate();
  const token = useSelector((state: State) => state.token);
  const [gender, setGender] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

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
      <Box bgcolor={'#f5f5f5'} padding={{ sm: '6.25rem', xs: 2 }}>
        <Typography
          fontWeight={'700'}
          fontSize={'1.5rem'}
          color={'#2C3E50'}
          textAlign={'center'}
          marginBottom={'2.1875rem'}
        >
          Carefully fill in the details
        </Typography>
        <form>
          <Grid container spacing={3} bgcolor={'#fff'} padding={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                placeholder="Your phone number"
                type="tel"
                label="Phone Number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select value={gender} label="gender" onChange={handleChange}>
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="passport">
                <Typography fontSize={'0.875rem'}>Passport</Typography>
              </label>
              <Box
                width={'100%'}
                height={'100px'}
                border={'1px dashed #2C3E50'}
                marginTop={1}
                textAlign={'center'}
                position={'relative'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                fontSize={'0.875rem'}
              >
                <input type="file" name="passport" className="passport-input" />
                Click here or drop the file here
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="warning">
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
