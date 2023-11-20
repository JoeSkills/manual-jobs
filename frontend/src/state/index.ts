import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

export type State = {
  user: {
    username: string;
    email: string;
    password: string;
    accepted?: boolean;
    role: string;
    _id: string;
    userImg?: string;
    phoneNumber?: number;
    gender?: string;
  };
  token: string;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
