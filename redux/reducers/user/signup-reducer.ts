import { INITIAL_STATE } from '@/constants/initial-state';
import { createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const signup = createSlice({
    name: 'SIGN UP',
    initialState,
    reducers: {
        SIGNUP_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        SIGNUP_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        SIGNUP_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } =
    signup.actions;
export default signup.reducer;
