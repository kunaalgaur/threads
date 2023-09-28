import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const getFollowings = createSlice({
    name: 'GET FOLLOWINGS',
    initialState,
    reducers: {
        GET_FOLLOWINGS_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_FOLLOWINGS_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        GET_FOLLOWINGS_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
    GET_FOLLOWINGS_FAILURE,
    GET_FOLLOWINGS_REQUEST,
    GET_FOLLOWINGS_SUCCESS,
} = getFollowings.actions;
export default getFollowings.reducer;
