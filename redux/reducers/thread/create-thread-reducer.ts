import { INITIAL_STATE } from '@/constants/initial-state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const createThread = createSlice({
    name: 'CREATE THREAD',
    initialState,
    reducers: {
        CREATE_THREAD_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        CREATE_THREAD_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        CREATE_THREAD_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
    CREATE_THREAD_REQUEST,
    CREATE_THREAD_SUCCESS,
    CREATE_THREAD_FAILURE,
} = createThread.actions;
export default createThread.reducer;
