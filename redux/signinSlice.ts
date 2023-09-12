import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  error: any;
  loading: boolean;
  userId: null | string;
  token: null | string;
};

const initialState = {
  error: null,
  loading: false,
  userId: null,
  token: null,
} as unknown as InitialState;

export const signin = createSlice({
  name: 'Sign in',
  initialState,
  reducers: {
    request: (state) => {
      state.error = null;
      state.loading = true;
      state.userId = null;
      state.token = null;
    },
    success: (state, action) => {
      state.error = null;
      state.loading = false;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    failure: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
      state.userId = null;
      state.token = null;
    },
    logout: (state) => {
      state.error = null;
      state.loading = false;
      state.userId = null;
      state.token = null;
    },
  },
});

export const { request, success, failure, logout } = signin.actions;
export default signin.reducer;
