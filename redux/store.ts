import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './reducers/user/signup-reducer';
import signinReducer from './reducers/user/signin-reducers';
import signoutReducer from './reducers/user/signout-reducer';
import onboardingReducer from './reducers/user/onboarding-reducer';
import getAllUserReducer from './reducers/user/get-all-user-reducer';
import getSingleUserReducer from './reducers/user/get-single-user-reducer';
import editUserReducer from './reducers/user/edit-user-reducer';
import createThreadReducer from './reducers/thread/create-thread-reducer';
import deleteThreadReducer from './reducers/thread/delete-thread-reducer';
import editThreadReducer from './reducers/thread/edit-thread-reducer';
import getAllThreadReducer from './reducers/thread/get-all-thread-reducer';
import getFeedReducer from './reducers/thread/get-feed-reducer';
import getSingleThreadReducer from './reducers/thread/get-single-thread-reducer';
import createReplyReducer from './reducers/reply/create-reply-reducer';
import getSingleThreadRepliesReducer from './reducers/reply/get-single-thread-replies-reducer';

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signin: signinReducer,
        signout: signoutReducer,
        onboarding: onboardingReducer,
        getAllUser: getAllUserReducer,
        getSingleUser: getSingleUserReducer,
        editUser: editUserReducer,

        createThread: createThreadReducer,
        deleteThread: deleteThreadReducer,
        editThread: editThreadReducer,
        getAllThread: getAllThreadReducer,
        getFeed: getFeedReducer,
        getSingleThread: getSingleThreadReducer,

        createReply: createReplyReducer,
        getSingleThreadReplies: getSingleThreadRepliesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
