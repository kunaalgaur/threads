import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const getFollowers = createSlice({
    name: 'GET FOLLOWERS',
    initialState,
    reducers: {
        GET_FOLLOWERS_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_FOLLOWERS_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        GET_FOLLOWERS_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
    GET_FOLLOWERS_FAILURE,
    GET_FOLLOWERS_REQUEST,
    GET_FOLLOWERS_SUCCESS,
} = getFollowers.actions;
export default getFollowers.reducer;
