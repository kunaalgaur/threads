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

export const followUser = createSlice({
    name: 'FOLLOW USER',
    initialState,
    reducers: {
        FOLLOW_USER_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        FOLLOW_USER_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        FOLLOW_USER_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS } =
    followUser.actions;
export default followUser.reducer;
