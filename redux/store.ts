import { configureStore } from '@reduxjs/toolkit';
import signinReducer from './slice/signinSlice';
import threadReducer from './slice/threadSlice';
import signupReducer from './slice/signupSlice';
import onboardingSlice from './slice/onboardingSlice';

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signin: signinReducer,
        thread: threadReducer,
        onboarding: onboardingSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
