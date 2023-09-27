import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type INITIAL_STATE = {
    loading: boolean;
    error: any | null;
};

const initialState = {
    loading: false,
    error: null,
} as unknown as INITIAL_STATE;

export const getFeed = createSlice({
    name: 'GET FEED',
    initialState,
    reducers: {
        GET_FEED_REQUEST: (state) => {
            state.loading = true;
            state.error = null;
        },

        GET_FEED_SUCCESS: (state) => {
            state.loading = false;
            state.error = null;
        },

        GET_FEED_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const { GET_FEED_FAILURE, GET_FEED_REQUEST, GET_FEED_SUCCESS } =
    getFeed.actions;
export default getFeed.reducer;
