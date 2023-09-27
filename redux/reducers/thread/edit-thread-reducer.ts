import { createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const editThread = createSlice({
    name: 'EDIT thread',
    initialState,
    reducers: {
        EDIT_THREAD_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        EDIT_THREAD_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        EDIT_THREAD_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { EDIT_THREAD_FAILURE, EDIT_THREAD_REQUEST, EDIT_THREAD_SUCCESS } =
    editThread.actions;
export default editThread.reducer;
