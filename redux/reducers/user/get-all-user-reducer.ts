import { INITIAL_STATE } from '@/constants/initial-state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
    userId: string | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const getAllUser = createSlice({
    name: 'GET ALL USER',
    initialState,
    reducers: {
        GET_ALL_USER_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_ALL_USER_SUCCESS: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_ALL_USER_FAILURE: (state, action) => {
            state.loading = true;
            state.error = action.payload.error;
        },
    },
});

export const {
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILURE,
} = getAllUser.actions;
export default getAllUser.reducer;
