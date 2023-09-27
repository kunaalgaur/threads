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

export const getSingleThreadReplies = createSlice({
    name: 'GET SINGLE THREAD REPLIES',
    initialState,
    reducers: {
        GET_SINGLE_THREAD_REPLIES_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_SINGLE_THREAD_REPLIES_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        GET_SINGLE_THREAD_REPLIES_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
    GET_SINGLE_THREAD_REPLIES_REQUEST,
    GET_SINGLE_THREAD_REPLIES_SUCCESS,
    GET_SINGLE_THREAD_REPLIES_FAILURE,
} = getSingleThreadReplies.actions;
export default getSingleThreadReplies.reducer;
