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

export const getSingleThread = createSlice({
    name: 'GET SINGLE THREAD',
    initialState,
    reducers: {
        GET_SINGLE_THREAD_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_SINGLE_THREAD_SUCCESS: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_SINGLE_THREAD_FAILURE: (state, action) => {
            state.loading = true;
            state.error = action.payload.error;
        },
    },
});

export const {
    GET_SINGLE_THREAD_FAILURE,
    GET_SINGLE_THREAD_REQUEST,
    GET_SINGLE_THREAD_SUCCESS,
} = getSingleThread.actions;
export default getSingleThread.reducer;
