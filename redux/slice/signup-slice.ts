import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    loading: boolean;
    error: any;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as InitialState;

export const signup = createSlice({
    name: 'Sign up',
    initialState,
    reducers: {
        request: (state) => {
            state.loading = true;
            state.error = null;
        },

        success: (state) => {
            state.loading = false;
            state.error = null;
        },

        failure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { request, success, failure } = signup.actions;
export default signup.reducer;
