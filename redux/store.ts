import { configureStore } from '@reduxjs/toolkit';
import signinReducer from './slice/signinSlice';
import threadReducer from './slice/threadSlice';
import signupReducer from './slice/signupSlice';
import onboardingSlice from './slice/onboardingSlice';
import profileSlice from './slice/profileSlice';

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signin: signinReducer,
        thread: threadReducer,
        onboarding: onboardingSlice,
        profile: profileSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
