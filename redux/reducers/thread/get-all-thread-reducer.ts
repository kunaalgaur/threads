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

export const getAllThread = createSlice({
    name: 'GET ALL THREAD',
    initialState,
    reducers: {
        GET_ALL_THREAD_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_ALL_THREAD_SUCCESS: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_ALL_THREAD_FAILURE: (state, action) => {
            state.loading = true;
            state.error = action.payload.error;
        },
    },
});

export const {
    GET_ALL_THREAD_FAILURE,
    GET_ALL_THREAD_REQUEST,
    GET_ALL_THREAD_SUCCESS,
} = getAllThread.actions;
export default getAllThread.reducer;
