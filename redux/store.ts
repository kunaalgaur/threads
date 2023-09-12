import { configureStore } from '@reduxjs/toolkit';
import signinReducer from './signinSlice';

export const store = configureStore({
  reducer: {
    signin: signinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
