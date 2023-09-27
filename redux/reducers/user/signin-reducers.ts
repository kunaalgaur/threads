import { currentUserId } from '@/constants/variable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
    userId: string | null;
};

const initialState = {
    loading: false,
    error: null,
    userId: (currentUserId as string) || null,
} as unknown as INITIAL_STATE;

export const signin = createSlice({
    name: 'SIGN IN',
    initialState,
    reducers: {
        SIGNIN_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
            state.userId = null;
        },

        SIGNIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.error = null;
            state.userId = action.payload.userId;
        },

        SIGNIN_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.userId = null;
        },
    },
});

export const { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } =
    signin.actions;

export default signin.reducer;
