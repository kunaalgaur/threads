import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as InitialState;

export const profile = createSlice({
    name: 'Thread',
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

        updateRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },

        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
    request,
    success,
    failure,
    updateRequest,
    updateSuccess,
    updateFailure,
} = profile.actions;
export default profile.reducer;
