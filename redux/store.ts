import { configureStore } from '@reduxjs/toolkit';
import signinReducer from './slice/signin-slice';
import threadReducer from './slice/thread-slice';
import signupReducer from './slice/signup-slice';
import onboardingSlice from './slice/onboarding-slice';
import profileSlice from './slice/profile-slice';
import getThreadsSlice from './slice/get-all-threads-slice';

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signin: signinReducer,
        thread: threadReducer,
        onboarding: onboardingSlice,
        profile: profileSlice,
        getThreads: getThreadsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
