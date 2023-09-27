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

export const getSingleUser = createSlice({
    name: 'GET SINGLE USER',
    initialState,
    reducers: {
        GET_SINGLE_USER_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_SINGLE_USER_SUCCESS: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_SINGLE_USER_FAILURE: (state, action) => {
            state.loading = true;
            state.error = action.payload.error;
        },
    },
});

export const {
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
    GET_SINGLE_USER_FAILURE,
} = getSingleUser.actions;
export default getSingleUser.reducer;
