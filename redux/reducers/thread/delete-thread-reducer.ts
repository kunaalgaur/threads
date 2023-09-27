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

export const deleteThread = createSlice({
    name: 'DELETE THREAD',
    initialState,
    reducers: {
        DELETE_THREAD_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        DELETE_THREAD_SUCCESS: (state) => {
            state.loading = true;
            state.error = null;
        },

        DELETE_THREAD_FAILURE: (state, action) => {
            state.loading = true;
            state.error = action.payload.error;
        },
    },
});

export const {
    DELETE_THREAD_FAILURE,
    DELETE_THREAD_REQUEST,
    DELETE_THREAD_SUCCESS,
} = deleteThread.actions;
export default deleteThread.reducer;
