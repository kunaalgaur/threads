import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as InitialState;

export const getThreads = createSlice({
    name: 'Get all threads',
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

export const { request, success, failure } = getThreads.actions;
export default getThreads.reducer;