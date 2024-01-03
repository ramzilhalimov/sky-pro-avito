import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  name: '',
  access_token: '',
  refresh_token: '',
  token_type: '',
  avatar: '',
  city: '',
  phone: '',
  surname: '',
  id: 0,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      state.access_token = action.payload.access_token || '';
      state.refresh_token = action.payload.refresh_token || '';
    },
  },
});

export const { setAuthorization } = authorizationSlice.actions;

export default authorizationSlice.reducer;
